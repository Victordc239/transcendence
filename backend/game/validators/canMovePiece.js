const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');
const {FINAL_POSITION, MAIN_TRACK_SIZE} = require('../constants');
const isEnteringHomeStretch = require('../utils/isEnteringHomeStretch');
const getDistanceToHomeEntry = require('../utils/getDistanceToHomeEntry');
const getRealBoardPosition = require('../utils/getRealBoardPosition');
const isPositionBlocked = require('../rules/isPositionBlocked');
const isDestinationBlocked = require('../rules/isDestinationBlocked');
const isEnemyBlockade = require('../rules/isEnemyBlockade');

function canMovePiece(game, playerId, pieceIndex)
{
	if (game.turn !== playerId)
	{
		return {
			ok: false,
			error: 'Not your turn'
		};
	}
	const player = getPlayer(game, playerId);
	if (!player)
	{
		return {
			ok: false,
			error: 'Player not found'
		};
	}
	const piece = getPiece(player, pieceIndex);
	if (!piece)
	{
		return {
			ok: false,
			error: 'Piece not found'
		};
	}
	if (game.dice === null)
	{
		return {
			ok: false,
			error: 'Roll dice first'
		};
	}

	/// SALIR DE CASA
	if (piece.state === 'base')
	{
		if (game.dice !== 5)
		{
			return {
				ok: false,
				error: 'Need 5 to leave base'
			};
		}
		const exitPosition = getRealBoardPosition(player.color, 0);
		if (isEnemyBlockade(game, player.color, exitPosition))
		{
			return {
				ok: false,
				error: 'Exit blocked by enemy blockade'
			};
		}
		const ownPiecesOnExit = player.pieces.filter(p => {
			if (p.steps < 0)
				return false;
			const pos = getRealBoardPosition(player.color, p.steps);
			return pos === exitPosition;
		});
		if (ownPiecesOnExit.length >= 2)
		{
			return {
				ok: false,
				error: 'Own blockade on exit'
			};
		}

		return { ok: true };
	}

	// FICHA TERMINADA
	if (piece.state === 'finished')
	{
		return {
			ok: false,
			error: 'Piece already finished'
		};
	}

	// PASILLO FINAL
	if (piece.steps >= MAIN_TRACK_SIZE)
	{
		if (piece.steps + game.dice > FINAL_POSITION)
		{
			return {
				ok: false,
				error: 'Exact roll required'
			};
		}

		return { ok: true };
	}

	// POSICIÓN ACTUAL
	const startPosition = getRealBoardPosition(player.color, piece.steps);

	// VALIDAR RECORRIDO
	for (let step = 1; step <= game.dice; step++)
	{
		if (isEnteringHomeStretch(player.color, piece.steps, step))
			break;

		const futureSteps = piece.steps + step;
		const globalPosition = getRealBoardPosition(player.color, futureSteps);

		if (isPositionBlocked(game, globalPosition, startPosition))
		{
			return {
				ok: false,
				error: 'Blockade in path'
			};
		}
	}

	// ENTRADA AL PASILLO FINAL
	if (isEnteringHomeStretch(player.color, piece.steps, game.dice))
	{
		const distanceToEntry = getDistanceToHomeEntry(player.color, piece.steps);
		const overshoot = game.dice - distanceToEntry - 1;
		const target = MAIN_TRACK_SIZE + overshoot;

		if (target > FINAL_POSITION)
		{
			return {
				ok: false,
				error: 'Exact roll required'
			};
		}

		return { ok: true };
	}

	const targetSteps = piece.steps + game.dice;
	const targetPosition = getRealBoardPosition(player.color, targetSteps);
	// NO se puede terminar encima de una barrera
	if (isDestinationBlocked(game, targetPosition))
	{
		return {
			ok: false,
			error: 'Destination blocked by blockade'
		};
	}

	return { ok: true };
}

module.exports = canMovePiece;