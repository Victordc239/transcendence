function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function nextTurn(game) {
  const index = game.players.findIndex(p => p.id === game.turn);
  const nextIndex = (index + 1) % game.players.length;
  game.turn = game.players[nextIndex].id;
}

module.exports = { rollDice, nextTurn };