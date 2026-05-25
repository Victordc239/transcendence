const canMovePiece = require('../validators/canMovePiece');

function getAvailableMoves(game, playerId)
{
	const availableMoves = [];

	for (let i = 0; i < 4; i++)
	{
		const validation = canMovePiece(game, playerId, i);

		if (validation.ok)
		{
			availableMoves.push(i);
		}
	}

	return availableMoves;
}

module.exports = getAvailableMoves;