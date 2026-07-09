const {SAFE_CELLS, MAIN_TRACK_SIZE} = require('../constants');
const getRealBoardPosition = require('../utils/getRealBoardPosition');
const getBlockades = require('./getBlockades');

function checkCapture(game, currentPlayerId, movedPiece, justLeftBase = false)
{
	const currentPlayer = game.players.find(p => p.id === currentPlayerId);
	if (!currentPlayer)
		return false;
	if (!movedPiece)
		return false;
	// Casa
	if (movedPiece.steps < 0)
		return  false;
	// Pasillo final
	if (movedPiece.steps >= MAIN_TRACK_SIZE)
		return false;
	const currentPosition = getRealBoardPosition(currentPlayer.color, movedPiece.steps);
	// Casilla segura (excepto la propia salida al sacar ficha de casa)
	const isOwnExitOnLeaveBase = justLeftBase && movedPiece.steps === 0;
	if (SAFE_CELLS.includes(currentPosition) && !isOwnExitOnLeaveBase)
		return false;

	const blockades = getBlockades(game);
	// Nunca capturar sobre una barrera
	const isBlockadeCell =blockades.some(blockade => blockade.position === currentPosition);
	if (isBlockadeCell)
		return false;

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
					return;
				if (p.steps >= MAIN_TRACK_SIZE)
					return;
				return (getRealBoardPosition(enemy.color, p.steps) === currentPosition);
			});
			// barrera enemiga
			if (enemyPiecesOnCell.length >= 2)
				return false;
			enemyPiece.steps = -1;
			enemyPiece.state = 'base';
			return true;
		}
	}
	return false;
}

module.exports = checkCapture;