const { MAIN_TRACK_SIZE, FINAL_POSITION } = require('../constants');
const isEnteringHomeStretch = require('../utils/isEnteringHomeStretch');
const getDistanceToHomeEntry = require('../utils/getDistanceToHomeEntry');

//function applyMove(game, playerId, pieceIndex)
function applyMove(game, playerId, pieceIndex, steps = game.dice)
{
	const player = game.players.find(p => p.id === playerId);

	if (!player)
		return null;

	const piece = player.pieces[pieceIndex];

	if (!piece)
		return null;

	let reachedGoal = false;

	// SALIR DE CASA

	if (piece.state === 'base' && steps === 5)
	{
		piece.state = 'track';
		piece.steps = 0;

		return {
			piece,
			reachedGoal,
			leftBase: true
		};
	}

	// PASILLO FINAL

	if (piece.steps >= MAIN_TRACK_SIZE)
	{
		piece.steps += steps;

		if (piece.steps === FINAL_POSITION)
		{
			piece.state = 'finished';
			reachedGoal = true;
		}

		return {
			piece,
			reachedGoal
		};
	}

	// ENTRADA AL PASILLO FINAL

	if (isEnteringHomeStretch(player.color, piece.steps, steps))
	{
		const distanceToEntry = getDistanceToHomeEntry(player.color, piece.steps);
		const overshoot = steps - distanceToEntry - 1;

		piece.steps = MAIN_TRACK_SIZE + overshoot;
		piece.state = 'final';

		if (piece.steps === FINAL_POSITION)
		{
			piece.state = 'finished';
			reachedGoal = true;
		}

		return {
			piece,
			reachedGoal
		};
	}

	// RECORRIDO NORMAL

	piece.steps += steps;

	return {
		piece,
		reachedGoal
	};
}

module.exports = applyMove;