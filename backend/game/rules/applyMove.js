const { BOARD_SIZE } = require('../constants');

const BASE_POSITION = -1;
const FINISHED_POSITION = 999;

function applyMove(game, playerId, pieceIndex)
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
	🔥 SACAR DE BASE
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
	🔥 MOVER EN TABLERO
	*/
	if (piece.state === 'track')
	{
		piece.position += game.dice;

		/*
		🔥 LLEGAR A META
		*/
		if (piece.position >= BOARD_SIZE)
		{
			piece.state = 'finished';
			piece.position =
				FINISHED_POSITION;
		}
	}
}

module.exports = applyMove;