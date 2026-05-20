const {
  SAFE_CELLS,
  BASE_POSITION,
  FINAL_STRETCH_START
} = require('../constants');

const getGlobalPosition = require(
  '../utils/getGlobalPosition'
);

function checkCapture(game, currentPlayerId) {

  const currentPlayer = game.players.find(
    p => p.id === currentPlayerId
  );

  if (!currentPlayer) {
    return;
  }

  for (const piece of currentPlayer.pieces) {

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

    const currentGlobal =
      getGlobalPosition(
        currentPlayer.color,
        piece.position
      );

    /*
      Casilla segura
    */

    if (SAFE_CELLS.includes(currentGlobal)) {
      continue;
    }

    for (const enemy of game.players) {

      if (enemy.id === currentPlayerId) {
        continue;
      }

      for (const enemyPiece of enemy.pieces) {

        if (
          enemyPiece.position === BASE_POSITION
        ) {
          continue;
        }

        if (
          enemyPiece.position >= FINAL_STRETCH_START
        ) {
          continue;
        }

        const enemyGlobal =
          getGlobalPosition(
            enemy.color,
            enemyPiece.position
          );

        if (enemyGlobal === currentGlobal) {

          enemyPiece.position =
            BASE_POSITION;
        }
      }
    }
  }
}

module.exports = checkCapture;