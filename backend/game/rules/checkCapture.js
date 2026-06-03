const {SAFE_CELLS, MAIN_TRACK_SIZE} = require('../constants');
const getRealBoardPosition = require('../utils/getRealBoardPosition');
const getBlockades = require('./getBlockades');

function checkCapture(game, currentPlayerId)
{
	const currentPlayer = game.players.find(p => p.id === currentPlayerId);
	if (!currentPlayer)
	{
		return;
	}

	const blockades = getBlockades(game);
	for (const piece of currentPlayer.pieces)
	{
		// Casa
		if (piece.steps < 0)
		{
			continue;
		}

		// Pasillo final
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

		// 🔥 NO SE PUEDE CAPTURAR UNA BARRERA
		const isBlockadeCell = blockades.some(blockade => blockade.position === currentPosition);
		if (isBlockadeCell)
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
				// Casa
				if (enemyPiece.steps < 0)
				{
					continue;
				}
				// Pasillo final
				if (enemyPiece.steps >= MAIN_TRACK_SIZE)
				{
					continue;
				}

				const enemyPosition = getRealBoardPosition(enemy.color, enemyPiece.steps);
				if (enemyPosition !== currentPosition)
				{
					continue;
				}

				const enemyPiecesOnCell = enemy.pieces.filter(p => {
					if (p.steps < 0)
					{
						return false;
					}
					if (p.steps >= MAIN_TRACK_SIZE)
					{
						return false;
					}
					const pos = getRealBoardPosition(enemy.color, p.steps);
					return pos === currentPosition;});
				// Si hay más de una ficha enemiga significa barrera enemiga. No se puede capturar.
				if (enemyPiecesOnCell.length >= 2)
				{
					continue;
				}
				// Captura normal
				enemyPiece.steps = -1;
				enemyPiece.state = 'base';
				return;
			}
		}
	}
}

module.exports = checkCapture;