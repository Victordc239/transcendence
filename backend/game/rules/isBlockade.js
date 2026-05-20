const {
  BASE_POSITION,
  FINAL_STRETCH_START
} = require('../constants');

const getGlobalPosition = require(
  '../utils/getGlobalPosition'
);

function isBlockade(game, color, globalPosition) {

  const player = game.players.find(
    p => p.color === color
  );

  if (!player) {
    return false;
  }

  let piecesInCell = 0;

  for (const piece of player.pieces) {

    /*
      Ignorar base
    */

    if (piece.position === BASE_POSITION) {
      continue;
    }

    /*
      Ignorar pasillo final
    */

    if (piece.position >= FINAL_STRETCH_START) {
      continue;
    }

    const pieceGlobal =
      getGlobalPosition(
        player.color,
        piece.position
      );

    if (pieceGlobal === globalPosition) {
      piecesInCell++;
    }
  }

  return piecesInCell >= 2;
}

module.exports = isBlockade;