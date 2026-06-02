const {MAIN_TRACK_SIZE, FINAL_POSITION} = require('../constants');
const isEnteringHomeStretch = require('../utils/isEnteringHomeStretch');
const getDistanceToHomeEntry = require('../utils/getDistanceToHomeEntry');

function applyMove(game, playerId, pieceIndex)
{
	const player =game.players.find(p => p.id === playerId);
	if (!player)
	{
		return;
	}

	const piece = player.pieces[pieceIndex];
	if (!piece)
	{
		return;
	}

	// SALIR DE CASA
	if (piece.state === 'base' && game.dice === 5)
	{
		piece.state = 'track';
		piece.steps = 0;
		return;
	}

	//YA EN PASILLO FINAL
	if (piece.steps >= MAIN_TRACK_SIZE)
	{
		piece.steps += game.dice;
		if (piece.steps === FINAL_POSITION)
		{
			piece.state = 'finished';
		}
		return;
	}

	// ENTRADA AL PASILLO FINAL
	if (isEnteringHomeStretch(player.color, piece.steps, game.dice))
	{
		const distanceToEntry = getDistanceToHomeEntry(player.color, piece.steps);

		const overshoot = game.dice - distanceToEntry - 1;

		piece.steps = MAIN_TRACK_SIZE + overshoot;
		piece.state = 'final';
		if (piece.steps === FINAL_POSITION)
		{
			piece.state = 'finished';
		}
		return;
	}

	//RECORRIDO EXTERIOR NORMAL
	piece.steps += game.dice;
}

module.exports = applyMove;