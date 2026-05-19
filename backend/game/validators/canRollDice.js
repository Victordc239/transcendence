function canRollDice(game, userId) {

  if (game.turn !== userId) {
    return {
      ok: false,
      error: "Not your turn"
    };
  }

  if (game.dice !== null) {
    return {
      ok: false,
      error: "Dice already rolled"
    };
  }

  return {
    ok: true
  };
}

module.exports = canRollDice;