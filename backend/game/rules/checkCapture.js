const {SAFE_CELLS, MAIN_TRACK_SIZE} = require('../constants');

const getRealBoardPosition = require('../utils/getRealBoardPosition');

function checkCapture(game, currentPlayerId)
{
	const currentPlayer = game.players.find(p => p.id === currentPlayerId);

	if (!currentPlayer)
	{
		return;
	}
	for (const piece of currentPlayer.pieces)
	{
		// Ignorar casa
		if (piece.steps < 0)
		{
			continue;
		}

		// Ignorar pasillo final
		if (piece.steps >= MAIN_TRACK_SIZE)
		{
			continue;
		}

		const currentPosition = getRealBoardPosition(currentPlayer.color, piece.steps);

		// Casilla segura
		if (SAFE_CELLS.includes(currentPosition))
		{
			continue;
		}

		for (const enemy of game.players)
		{
			if (enemy.id === currentPlayerId)
			{
				continue;
			}

			for (const enemyPiece of enemy.pieces)
			{
				if (enemyPiece.steps < 0)
				{
					continue;
				}

				if (enemyPiece.steps >= MAIN_TRACK_SIZE)
				{
					continue;
				}

				const enemyPosition = getRealBoardPosition(enemy.color, enemyPiece.steps);
				if (enemyPosition === currentPosition)
				{
					enemyPiece.steps = -1;
					enemyPiece.state = 'base';
				}
			}
		}
	}
}

module.exports = checkCapture;