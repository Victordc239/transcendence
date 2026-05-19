const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');

const {
  BASE_POSITION,
  FINAL_POSITION
} = require('../constants');

function applyMove(game, playerId, pieceIndex) {

  const player = getPlayer(game, playerId);

  const piece = getPiece(player, pieceIndex);

  if (piece.position === BASE_POSITION) {
    piece.position = 0;
    return;
  }

  piece.position += game.dice;

  if (piece.position > FINAL_POSITION) {
    piece.position = FINAL_POSITION;
  }
}

module.exports = applyMove;