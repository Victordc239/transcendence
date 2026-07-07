const canMovePiece = require('../validators/canMovePiece');

//function getAvailableMoves(game, playerId, bonusSteps)
function getAvailableMoves(game, playerId, steps = game.dice)
{
	const moves = [];

	for (let i = 0; i < 4; i++)
	{
		const validation = canMovePiece(game, playerId, i, steps)
		if (validation.ok)
			moves.push(i);
	}
	return moves;
}

module.exports = getAvailableMoves;