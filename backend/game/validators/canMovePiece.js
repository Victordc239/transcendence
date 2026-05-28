const getPlayer =
	require('../utils/getPlayer');

const getPiece =
	require('../utils/getPiece');

function canMovePiece(
	game,
	playerId,
	pieceIndex
)
{
	if (game.turn !== playerId)
	{
		return {
			ok: false,
			error: 'Not your turn'
		};
	}

	const player =
		getPlayer(game, playerId);

	if (!player)
	{
		return {
			ok: false,
			error: 'Player not found'
		};
	}

	const piece =
		getPiece(player, pieceIndex);

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

	/*
	🔥 SI ESTÁ EN BASE
	NECESITA 5
	*/
	if (
		piece.state === 'base' &&
		game.dice !== 5
	)
	{
		return {
			ok: false,
			error:
				'Need 5 to leave base'
		};
	}

	/*
	🔥 YA TERMINADA
	*/
	if (
		piece.state === 'finished'
	)
	{
		return {
			ok: false,
			error:
				'Piece already finished'
		};
	}

	return {
		ok: true
	};
}

module.exports =
	canMovePiece;