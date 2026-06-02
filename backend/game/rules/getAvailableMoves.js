const canMovePiece = require('../validators/canMovePiece');

function getAvailableMoves(game, playerId)
{
	const moves = [];

	for (let i = 0; i < 4; i++)
	{
		const validation = canMovePiece(game, playerId, i)
		if (validation.ok)
		{
			moves.push(i);
		}
	}
	return moves;
}

module.exports = getAvailableMoves;