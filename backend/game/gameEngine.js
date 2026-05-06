function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function nextTurn(game) {
  const index = game.players.findIndex(p => p.id === game.turn);
  const nextIndex = (index + 1) % game.players.length;
  game.turn = game.players[nextIndex].id;
}

/* -----------------------------
   REGLAS DEL JUEGO (IMPORTANTE)
------------------------------ */

function canJoinGame(game, userId) {
  if (game.status !== "waiting")
    return { ok: false, error: "Game already started" };

  if (game.players.length >= 4)
    return { ok: false, error: "Game full" };

  if (game.players.find(p => p.id === userId))
    return { ok: false, error: "Already in game" };

  return { ok: true };
}

function movePiece(game, playerId, pieceIndex) {
  const player = game.players.find(p => p.id === playerId);
  if (!player) return false;

  const piece = player.pieces[pieceIndex];
  if (!piece) return false;

  // salir de base
  if (piece.position === "base") {
    if (game.dice === 5) {
      piece.position = 0;
      return true;
    }
    return false;
  }

  // movimiento normal
  piece.position += game.dice;

  // meta
  if (piece.position >= 56) {
    piece.position = 56;
  }

  return true;
}

module.exports = {
  rollDice,
  nextTurn,
  movePiece,
  canJoinGame
};