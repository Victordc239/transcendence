const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');

function canMovePiece(game, playerId, pieceIndex) {
	if (game.turn !== playerId) {
		return { ok: false, error: "Not your turn" };
	}

	const player = getPlayer(game, playerId);
	const piece = getPiece(player, pieceIndex);

	if (!piece) {
		return { ok: false, error: "Piece not found" };
	}

	if (game.dice === null) {
		return { ok: false, error: "Roll dice first" };
	}

	if (piece.state === "base" && game.dice !== 5) {
		return { ok: false, error: "Need 5 to leave base" };
	}

	return { ok: true };
}

module.exports = canMovePiece;