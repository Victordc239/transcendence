const {getGame, saveGame,deleteGame} = require('../game/gameManager');
const setPlayerConnection = require('../game/rules/setPlayerConnection');
const checkPausedState = require('../game/rules/checkPausedState');
const isGameAbandoned = require('../game/rules/isGameAbandoned');
const normalizeGame = require('../game/utils/normalizeGame');

const { DISCONNECT_TIMEOUT } = require('../game/constants');

function registerGameSocket(io, socket)
{
	/* =============================
	JOIN GAME ROOM
	============================= */

	socket.on('game:join', async ({ gameId }) => {

		try
		{
			const game = await getGame(gameId);

			if (!game)
			{
				return socket.emit('error', { message: 'Game not found' });
			}

			const player = game.players.find( p => p.id === socket.user.id );

			if (!player)
			{
				return socket.emit('error', { message: 'You are not part of this game' });
			}

			/* =============================
			JOIN ROOM
			============================= */
			socket.join(String(gameId));

			/* =============================
			RECONNECT
			============================= */
			setPlayerConnection( game, socket.user.id, true	);
			checkPausedState(game);
			await saveGame(game);

			/* =============================
			SEND GAME STATE
			============================= */
			socket.emit('game:update', normalizeGame(game));
			io.to(String(gameId)).emit(
				'game:player_reconnected',
				{
					userId: socket.user.id
				}
			);

			io.to(String(gameId)).emit( 'game:update', game);
		}
		catch (err)
		{
			console.error(err);
			socket.emit('error', { message: 'Socket join error' });
		}
	});

	/* =============================
	GET GAME STATE
	============================= */

	socket.on('game:state', async ({ gameId }) => {

		try
		{
			const game = await getGame(gameId);
			if (!game)
			{
				return socket.emit('error', {
					message: 'Game not found'
				});
			}
			io.to(String(gameId)).emit('game:update', normalizeGame(game));
		}
		catch (err)
		{
			console.error(err);
		}
	});

	/* =============================
	DISCONNECT
	============================= */

	socket.on('disconnect', async () => {

		try
		{
			const joinedGames =
				Array.from(socket.rooms)
				.filter(room => room !== socket.id);

			for (const gameId of joinedGames)
			{
				const game = await getGame(gameId);

				if (!game)
				{
					continue;
				}

				setPlayerConnection(game, socket.user.id, false);
				checkPausedState(game);
				await saveGame(game);
				io.to(String(gameId)).emit('game:update', game);

				io.to(String(gameId)).emit(
					'game:player_disconnected',
					{
						userId: socket.user.id
					}
				);

				setTimeout(async () => {

					try
					{
						const updatedGame = await getGame(gameId);
						if (!updatedGame)
						{
							return;
						}

						const player = updatedGame.players.find( p => p.id === socket.user.id);
						if (!player)
						{
							return;
						}

						/* Reconnected */
						if (player.connected)
						{
							return;
						}

						/* Abandoned */
						player.abandoned = true;
						const abandoned = isGameAbandoned(updatedGame);
						if (abandoned)
						{
							await deleteGame(gameId);
							return;
						}

						await saveGame(updatedGame);

						io.to(String(gameId)).emit(
							'game:player_abandoned',
							{
								userId: socket.user.id
							}
						);

						io.to(String(gameId)).emit(
							'game:update',
							updatedGame
						);
					}
					catch (err)
					{
						console.error(err);
					}

				}, DISCONNECT_TIMEOUT);
			}
		}
		catch (err)
		{
			console.error(err);
		}
	});
}

module.exports = registerGameSocket;