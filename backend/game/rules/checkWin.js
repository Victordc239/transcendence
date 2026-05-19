function checkWin(game, playerId) {

  const player = game.players.find(
    p => p.id === playerId
  );

  if (!player) {
    return false;
  }

  return player.pieces.every(
    piece => piece.position === 56
  );
}

module.exports = checkWin;