const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');
const {FINAL_POSITION, MAIN_TRACK_SIZE} = require('../constants');
const isEnteringHomeStretch = require('../utils/isEnteringHomeStretch');
const getDistanceToHomeEntry = require('../utils/getDistanceToHomeEntry');

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

	if (piece.state === 'base')
	{
		return {
			ok: game.dice === 5,
			error:
				game.dice === 5
					? null
					: 'Need 5 to leave base'
		};
	}

	if (piece.state === 'finished')
	{
		return {
			ok: false,
			error:
				'Piece already finished'
		};
	}

	// PASILLO FINAL
	if (piece.steps >= MAIN_TRACK_SIZE)
	{
		if (piece.steps + game.dice > FINAL_POSITION)
		{
			return {
				ok: false,
				error:
					'Exact roll required'
			};
		}

		return {
			ok: true
		};
	}

	// ENTRADA A PASILLO
	if (isEnteringHomeStretch(player.color, piece.steps, game.dice))
	{
		const distanceToEntry = getDistanceToHomeEntry(player.color, piece.steps);
		const overshoot = game.dice - distanceToEntry - 1;
		const target = MAIN_TRACK_SIZE + overshoot;
		if (target > FINAL_POSITION)
		{
			return {
				ok: false,
				error:
					'Exact roll required'
			};
		}
	}

	return {
		ok: true
	};
}

module.exports = canMovePiece;