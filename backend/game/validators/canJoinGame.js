const { GAME_STATUS } = require('../constants');

function canJoinGame(game, userId)
{
	if (game.status !== GAME_STATUS.WAITING)
	{
		return {
			ok: false,
			error: "Game already started"
		};
	}

	if (game.players.length >= 4)
	{
		return {
			ok: false,
			error: "Game full"
		};
	}

	const alreadyInGame = game.players.find(
		player => player.id === userId);

	if (alreadyInGame)
	{
		return {
			ok: false,
			error: "Already in game"
		};
	}

	return{
		ok: true
	};
}

module.exports = canJoinGame;