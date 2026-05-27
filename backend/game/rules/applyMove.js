const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');

function applyMove(game, playerId, pieceIndex) {
	const player = getPlayer(game, playerId);
	const piece = getPiece(player, pieceIndex);

	if (!piece) return;

	// salir de base
	if (piece.state === "base") {
		piece.state = "track";
		piece.trackIndex = 0;
		return;
	}

	if (piece.state === "track") {
		piece.trackIndex += game.dice;

		if (piece.trackIndex >= 68) {
			piece.state = "home";
			piece.homeIndex = 0;
		}
		return;
	}

	if (piece.state === "home") {
		piece.homeIndex += game.dice;

		if (piece.homeIndex >= 6) {
			piece.state = "finished";
		}
	}
}

module.exports = applyMove;