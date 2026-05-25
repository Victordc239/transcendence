const { GAME_STATUS } = require('../constants');

function canRollDice(game, userId)
{
	if (game.status !== GAME_STATUS.PLAYING)
	{
		return {
			ok: false,
			error: "Game has not started yet"
		};
	}

	if (game.turn !== userId)
	{
		return {
			ok: false,
			error: "Not your turn"
		};
	}

	if (game.dice !== null)
	{
		return {
			ok: false,
			error: "Dice already rolled"
		};
	}

	return {
		ok: true
	};
}

module.exports = canRollDice;