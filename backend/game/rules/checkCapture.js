const {SAFE_CELLS, MAIN_TRACK_SIZE} = require('../constants');
const getRealBoardPosition = require('../utils/getRealBoardPosition');
const getBlockades = require('./getBlockades');

function checkCapture(game, currentPlayerId, movedPiece)
{
	const currentPlayer = game.players.find(p => p.id === currentPlayerId);
	if (!currentPlayer)
		return;
	if (!movedPiece)
		return;
	// Casa
	if (movedPiece.steps < 0)
		return;
	// Pasillo final
	if (movedPiece.steps >= MAIN_TRACK_SIZE)
		return;
	const currentPosition = getRealBoardPosition(currentPlayer.color, movedPiece.steps);
	// Casilla segura
	if (SAFE_CELLS.includes(currentPosition))
		return;

	const blockades = getBlockades(game);
	// Nunca capturar sobre una barrera
	const isBlockadeCell =blockades.some(blockade => blockade.position === currentPosition);
	if (isBlockadeCell)
		return;

	for (const enemy of game.players)
	{
		if (enemy.id === currentPlayerId)
			continue;

		for (const enemyPiece of enemy.pieces)
		{
			if (enemyPiece.steps < 0)
				continue;
			if (enemyPiece.steps >= MAIN_TRACK_SIZE)
				continue;
			const enemyPosition = getRealBoardPosition(enemy.color, enemyPiece.steps);
			if (enemyPosition !== currentPosition)
				continue;

			const enemyPiecesOnCell =enemy.pieces.filter(p => {
				if (p.steps < 0)
					return false;
				if (p.steps >= MAIN_TRACK_SIZE)
					return false;
				return (getRealBoardPosition(enemy.color, p.steps) === currentPosition);
			});
			// barrera enemiga
			if (enemyPiecesOnCell.length >= 2)
				return;
			enemyPiece.steps = -1;
			enemyPiece.state = 'base';
			return;
		}
	}
}

module.exports = checkCapture;