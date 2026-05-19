function checkCapture(game, currentPlayerId) {

  const currentPlayer = game.players.find(
    p => p.id === currentPlayerId
  );

  if (!currentPlayer) {
    return;
  }

  for (const piece of currentPlayer.pieces) {

    if (
      piece.position === "base" ||
      piece.position === 56
    ) {
      continue;
    }

    for (const enemy of game.players) {

      if (enemy.id === currentPlayerId) {
        continue;
      }

      for (const enemyPiece of enemy.pieces) {

        if (
          enemyPiece.position === piece.position
        ) {
          enemyPiece.position = "base";
        }
      }
    }
  }
}

module.exports = checkCapture;