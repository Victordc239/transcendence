const { GAME_STATUS } = require('../constants');

function canJoinGame(game, userId)
{
	// 🔥 SI YA ESTÁ EN LA PARTIDA PERMITIR REJOIN
	const alreadyInGame = game.players.find(player => player.id === userId);
	if (alreadyInGame)
	{
		return {
			ok: true,
			rejoin: true
		};
	}

	if (game.players.length >= 4)
	{
		return {
			ok: false,
			error: 'Game full'
		};
	}

	if (game.status === GAME_STATUS.WAITING)
	{
		return {
			ok: true
		};
	}

	// 🔥 SOLO bloquear si ya empezó Y no pertenece a la partida
	if (game.status === GAME_STATUS.PLAYING || game.status === GAME_STATUS.PAUSED || game.status === GAME_STATUS.FINISHED)
	{
		return {
			ok: false,
			error: 'Game already started'
		};
	}

	return {
		ok: true
	};
}

module.exports = canJoinGame;