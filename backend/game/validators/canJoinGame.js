const { GAME_STATUS } = require('../constants');

function canJoinGame(game, userId)
{
	const alreadyInGame = game.players.find(
		player => player.id === userId
	);

	/*
	🔥 SI YA ESTÁ EN LA PARTIDA
	PERMITIR REJOIN
	*/
	if (alreadyInGame)
	{
		return {
			ok: true,
			rejoin: true
		};
	}

	/*
	🔥 SOLO bloquear si ya empezó
	Y no pertenece a la partida
	*/
	if (game.status !== GAME_STATUS.WAITING)
	{
		return {
			ok: false,
			error: 'Game already started'
		};
	}

	if (game.players.length >= 4)
	{
		return {
			ok: false,
			error: 'Game full'
		};
	}

	return {
		ok: true
	};
}

module.exports = canJoinGame;