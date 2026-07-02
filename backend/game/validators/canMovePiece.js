const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');
const {FINAL_POSITION, MAIN_TRACK_SIZE} = require('../constants');
const isEnteringHomeStretch = require('../utils/isEnteringHomeStretch');
const getDistanceToHomeEntry = require('../utils/getDistanceToHomeEntry');
const getRealBoardPosition = require('../utils/getRealBoardPosition');
const isPositionBlocked = require('../rules/isPositionBlocked');
const isDestinationBlocked = require('../rules/isDestinationBlocked');
const isEnemyBlockade = require('../rules/isEnemyBlockade');
const getBlockades = require('../rules/getBlockades');

function countPiecesOnPosition(game, globalPosition)
{
    let count = 0;
    for (const player of game.players)
    {
        for (const piece of player.pieces)
        {
            if (piece.steps < 0)
                continue;
            if (piece.steps >= MAIN_TRACK_SIZE)
                continue;
            if (getRealBoardPosition(player.color, piece.steps) === globalPosition)
                count++;
        }
    }
    return count;
}

// Lógica de legalidad "básica" de un movimiento, sin tener en cuenta la
// obligación de abrir barrera al sacar un 6. Se mantiene separada de
// canMovePiece para poder comprobar, sin recursividad, si alguna ficha de
// una barrera propia puede moverse.
function checkBasicMove(game, playerId, pieceIndex)
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

		const totalOnExit = countPiecesOnPosition(game, exitPosition);
    	if (totalOnExit >= 4)
    	    return { ok: false, error: 'Cell is full (max 4 pieces)' };

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

	const totalPiecesOnTarget = countPiecesOnPosition(game, targetPosition);
	if (totalPiecesOnTarget >= 4)
	{
	    return {
	        ok: false,
	        error: 'Cell is full (max 4 pieces)'
	    };
	}

	return { ok: true };
}

// Índices de las fichas propias del jugador que forman parte de alguna de
// sus propias barreras (dos fichas suyas juntas en la misma casilla del
// recorrido principal).
function getOwnBlockadePieceIndices(game, player)
{
	const ownBlockadePositions = getBlockades(game)
		.filter(blockade => blockade.color === player.color)
		.map(blockade => blockade.position);

	if (ownBlockadePositions.length === 0)
		return [];

	const indices = [];

	player.pieces.forEach((piece, index) => {
		if (piece.steps < 0)
			return;
		if (piece.steps >= MAIN_TRACK_SIZE)
			return;

		const position = getRealBoardPosition(player.color, piece.steps);
		if (ownBlockadePositions.includes(position))
			indices.push(index);
	});

	return indices;
}

function canMovePiece(game, playerId, pieceIndex)
{
	const basic = checkBasicMove(game, playerId, pieceIndex);
	if (!basic.ok)
		return basic;

	// REGLA DEL 6
	if (game.dice === 6)
	{
		const player = getPlayer(game, playerId);

		if (player)
		{
			const blockadeIndices = getOwnBlockadePieceIndices(game, player);

			if (blockadeIndices.length > 0 && !blockadeIndices.includes(pieceIndex))
			{
				const canOpenBlockade = blockadeIndices.some(
					blockadeIndex => checkBasicMove(game, playerId, blockadeIndex).ok
				);

				if (canOpenBlockade)
				{
					return {
						ok: false,
						error: 'Debes mover una ficha de tu barrera para abrirla'
					};
				}
			}
		}
	}

	return basic;
}

module.exports = canMovePiece;