const {getGame, saveGame, deleteGame} = require('../game/gameManager');
const setPlayerConnection = require('../game/rules/setPlayerConnection');
const checkPausedState = require('../game/rules/checkPausedState');
const isGameAbandoned = require('../game/rules/isGameAbandoned');
const normalizeGame = require('../game/utils/normalizeGame');
const withGameLock = require('../game/withGameLock');
const {clearDisconnectTimer, setDisconnectTimer} = require('../game/disconnectTimers');
const {DISCONNECT_TIMEOUT} = require('../game/constants');

function registerGameSocket(io, socket)
{
	socket.on('game:join',
		async ({ gameId }) => {
			try
			{
				if (socket.rooms.has(String(gameId)))
				{
					return;
				}
				socket.join(String(gameId));
				clearDisconnectTimer(gameId, socket.user.id);
				console.log('SOCKET JOIN', gameId,socket.user.id);

				const locked = await withGameLock(gameId,
					async (game) => {

						const player = game.players.find(p => p.id === socket.user.id);
						console.log('SOCKET PLAYER CHECK', socket.user.id, game.players.map(p => p.id));

						if (!player)
						{
							return {
								error:
									'You are not part of this game'
							};
						}
						setPlayerConnection(game, socket.user.id, true);
						checkPausedState(game);

						return {
							ok: true
						};
					});

				if (!locked)
				{
					return socket.emit(
						'error',
						{
							message:
								'Game not found'
						});
				}

				if (locked.result.error)
				{
					return socket.emit('error',
						{
							message:
								locked.result.error
						});
				}

				const normalized = normalizeGame(locked.game);
				socket.emit('game:update', normalized);

				io.to(String(gameId)
					).emit(
						'game:player_reconnected',
						{
							userId:
								socket.user.id
						}
					);

				io.to(String(gameId)
					).emit('game:update', normalized);
			}
			catch (err)
			{
				console.error('game:join error:', err);
				socket.emit('error',
				{
					message:
						'Socket join error'
				});
			}
		}
	);

	socket.on('game:state',
		async ({ gameId }) => {
			try
			{
				const game = await getGame(gameId);
				if (!game)
				{
					return socket.emit(
						'error',
						{
							message:
								'Game not found'
						}
					);
				}

				io.to(String(gameId)
					).emit(
						'game:update',
						normalizeGame(
							game
						)
					);
			}
			catch (err)
			{
				console.error('game:state error:', err);
			}
		}
	);

	// CHAT
	socket.on('chat:send',
		async ({ gameId, message }) => {
			try
			{
				if (!message?.trim())
				{
					return;
				}

				const game = await getGame(gameId);
				if (!game)
				{
					return;
				}

				const player = game.players.find(p => p.id === socket.user.id);
				if (!player)
				{
					return;
				}

				io.to(String(gameId)).emit('chat:message',
					{
						userId: socket.user.id,
						color: player.color,
						message: message.trim(),
						timestamp: Date.now()
					}
				);
			}
			catch (err)
			{
				console.error('chat:send error', err);
			}
		}
	);

	socket.on('disconnect',
		async () => {
			try
			{
				const joinedGames =Array.from(socket.rooms).filter(room => room !== socket.id);
				for (const gameId of joinedGames)
				{
					const locked = await withGameLock(gameId,
						async (game) => {
							setPlayerConnection(game, socket.user.id, false);
							checkPausedState(game);
							return {
								ok: true
							};});

					if (!locked)
					{
						continue;
					}

					const normalized = normalizeGame(locked.game);

					io.to(String(gameId)
						).emit('game:update', normalized);

					io.to(String(gameId)
						).emit('game:player_disconnected',
							{
								userId:
									socket.user.id
							});

					const timer = setTimeout(async () => {
						try
						{
							const updatedGame = await getGame(gameId);
							if (!updatedGame)
							{
								return;
							}

							const player = updatedGame.players.find(p => p.id === socket.user.id);
							if (!player)
							{
								return;
							}

							if (player.connected)
							{
								return;
							}

							player.abandoned = true;
							const abandoned = isGameAbandoned(updatedGame);
							if (abandoned)
							{
								await deleteGame(gameId);
								return;
							}

							await saveGame(updatedGame);
							io.to(String(gameId)
								).emit('game:player_abandoned',
									{
										userId:
											socket.user.id
									});

							io.to(String(gameId)
								).emit('game:update', normalizeGame(updatedGame));
						}
						catch (err)
						{
							console.error(err);
						}
					},DISCONNECT_TIMEOUT);
					
					console.log('SOCKET DISCONNECT', socket.user.id);
					setDisconnectTimer(gameId, socket.user.id, timer);
				}
			}
			catch (err)
			{
				console.error(err);
			}
		}
	);
}

module.exports = registerGameSocket;