const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');

const {
  BASE_POSITION,
  FINAL_POSITION
} = require('../constants');

function canMovePiece(game, playerId, pieceIndex) {

  const player = getPlayer(game, playerId);

  if (!player) {
    return {
      ok: false,
      error: "Player not found"
    };
  }

  const piece = getPiece(player, pieceIndex);

  if (!piece) {
    return {
      ok: false,
      error: "Piece not found"
    };
  }

  if (game.dice === null) {
    return {
      ok: false,
      error: "Roll dice first"
    };
  }

  if (
    piece.position === BASE_POSITION &&
    game.dice !== 5
  ) {
    return {
      ok: false,
      error: "Need 5 to leave base"
    };
  }

  if (
    piece.position !== BASE_POSITION &&
    piece.position + game.dice > FINAL_POSITION
  ) {
    return {
      ok: false,
      error: "Move exceeds final position"
    };
  }

  return {
    ok: true
  };
}

module.exports = canMovePiece;