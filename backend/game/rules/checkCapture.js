const {SAFE_CELLS, BASE_POSITION, FINAL_STRETCH_START} = require('../constants');

const getGlobalPosition = require('../utils/getGlobalPosition');
const getBlockades = require('./getBlockades');

function checkCapture(game, currentPlayerId)
{
	const currentPlayer = game.players.find(p => p.id === currentPlayerId);
	if (!currentPlayer)
	{
		return;
	}

	// Obtener bloqueos actuales
	const blockades = getBlockades(game);

	for (const piece of currentPlayer.pieces)
	{
		//Ignorar base
		if (piece.position === BASE_POSITION)
		{
			continue;
		}

		// Ignorar pasillo final
		if (piece.position >= FINAL_STRETCH_START)
		{
			continue;
		}

		const currentGlobal = getGlobalPosition(currentPlayer.color, piece.position);

		// Casilla segura
		if (SAFE_CELLS.includes(currentGlobal))
		{
			continue;
		}

		for (const enemy of game.players)
		{
			// Ignorar jugador actual
			if (enemy.id === currentPlayerId)
			{
				continue;
			}

			for (const enemyPiece of enemy.pieces)
			{
				// Ignorar base
				if (enemyPiece.position === BASE_POSITION)
				{
					continue;
				}

				// Ignorar pasillo final
				if(enemyPiece.position >= FINAL_STRETCH_START)
				{
					continue;
				}

				const enemyGlobal = getGlobalPosition(enemy.color, enemyPiece.position);

				// Misma casilla
				if (enemyGlobal === currentGlobal)
				{
					// No se puede comer un bloqueo
					const isEnemyBlockade = blockades.find(blockade => blockade.position === enemyGlobal);
					if (isEnemyBlockade)
					{
						continue;
					}

					// Comer ficha
					enemyPiece.position = BASE_POSITION;
				}
			}
		}
	}
}

module.exports = checkCapture;