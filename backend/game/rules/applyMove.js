const {
	FINAL_POSITION,
	FINAL_STRETCH_START
} = require('../constants');

function applyMove(
	game,
	playerId,
	pieceIndex
)
{
	const player =
		game.players.find(
			p => p.id === playerId
		);

	if (!player)
	{
		return;
	}

	const piece =
		player.pieces[pieceIndex];

	if (!piece)
	{
		return;
	}

	/*
	|--------------------------------------------------------------------------
	| SALIR DE CASA
	|--------------------------------------------------------------------------
	*/

	if (
		piece.state === 'base' &&
		game.dice === 5
	)
	{
		piece.state = 'track';
		piece.position = 0;
		return;
	}

	/*
	|--------------------------------------------------------------------------
	| MOVER
	|--------------------------------------------------------------------------
	*/

	if (
		piece.state === 'track'
	)
	{
		const target =
			piece.position +
			game.dice;

		/*
		| No puede pasarse
		*/

		if (
			target >
			FINAL_POSITION
		)
		{
			return;
		}

		piece.position =
			target;

		/*
		| Entra al pasillo final
		*/

		if (
			piece.position >=
			FINAL_STRETCH_START
		)
		{
			piece.state =
				'final';
		}

		/*
		| Llegó a meta
		*/

		if (
			piece.position ===
			FINAL_POSITION
		)
		{
			piece.state =
				'finished';
		}
	}
}

module.exports =
	applyMove;