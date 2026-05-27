const { getGame, saveGame, deleteGame } = require('../game/gameManager');
const setPlayerConnection = require('../game/rules/setPlayerConnection');
const checkPausedState = require('../game/rules/checkPausedState');
const isGameAbandoned = require('../game/rules/isGameAbandoned');
const normalizeGame = require('../game/utils/normalizeGame');

const { DISCONNECT_TIMEOUT } = require('../game/constants');

function registerGameSocket(io, socket)
{
	socket.on('game:join', async ({ gameId }) => {
		try
		{
			const game = await getGame(gameId);

			if (!game)
			{
				return socket.emit('error', { message: 'Game not found' });
			}

			const player = game.players.find(p => p.id === socket.user.id);

			if (!player)
			{
				return socket.emit('error', { message: 'You are not part of this game' });
			}

			socket.join(String(gameId));

			setPlayerConnection(game, socket.user.id, true);
			checkPausedState(game);

			await saveGame(game);

			const normalized = normalizeGame(game);

			socket.emit('game:update', normalized);

			io.to(String(gameId)).emit('game:player_reconnected', {
				userId: socket.user.id
			});

			io.to(String(gameId)).emit('game:update', normalized);
		}
		catch (err)
		{
			console.error('game:join error:', err);
			socket.emit('error', { message: 'Socket join error' });
		}
	});

	socket.on('game:state', async ({ gameId }) => {
		try
		{
			const game = await getGame(gameId);

			if (!game)
			{
				return socket.emit('error', { message: 'Game not found' });
			}

			const normalized = normalizeGame(game);

			io.to(String(gameId)).emit('game:update', normalized);
		}
		catch (err)
		{
			console.error('game:state error:', err);
		}
	});

	socket.on('disconnect', async () => {
		try
		{
			const joinedGames =
				Array.from(socket.rooms).filter(room => room !== socket.id);

			for (const gameId of joinedGames)
			{
				const game = await getGame(gameId);

				if (!game) continue;

				setPlayerConnection(game, socket.user.id, false);
				checkPausedState(game);
				await saveGame(game);

				const normalized = normalizeGame(game);

				io.to(String(gameId)).emit('game:update', normalized);

				io.to(String(gameId)).emit('game:player_disconnected', {
					userId: socket.user.id
				});

				setTimeout(async () => {
					try
					{
						const updatedGame = await getGame(gameId);
						if (!updatedGame) return;

						const player = updatedGame.players.find(
							p => p.id === socket.user.id
						);

						if (!player) return;

						if (player.connected) return;

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
							{ userId: socket.user.id }
						);

						io.to(String(gameId)).emit(
							'game:update',
							normalizeGame(updatedGame)
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