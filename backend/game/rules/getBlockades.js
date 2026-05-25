const { BASE_POSITION, FINAL_STRETCH_START } = require('../constants');
const getGlobalPosition = require('../utils/getGlobalPosition');

function getBlockades(game)
{

	const blockades = [];

	for (const player of game.players)
	{
		const positionsCount = {};

		for (const piece of player.pieces)
		{
			if (piece.position === BASE_POSITION)
			{
				continue;
			}

			if (piece.position >= FINAL_STRETCH_START)
			{
				continue;
			}

			const globalPosition = getGlobalPosition(player.color, piece.position);
			positionsCount[globalPosition] = (positionsCount[globalPosition] || 0) + 1;
		}

		for (const position in positionsCount)
		{
			if (positionsCount[position] >= 2)
			{
				blockades.push({ color: player.color, position: Number(position)});
			}
		}
	}
	return blockades;
}

module.exports = getBlockades;