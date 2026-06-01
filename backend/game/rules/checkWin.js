const {
	FINAL_POSITION
} = require('../constants');

function checkWin(
	game,
	playerId
)
{
	const player =
		game.players.find(
			p => p.id === playerId
		);

	if (!player)
	{
		return false;
	}

	return player.pieces.every(
		piece =>
			piece.position ===
			FINAL_POSITION
	);
}

module.exports =
	checkWin;