const {
  GAME_STATUS
} = require('../constants');

function checkPausedState(game) {

  const disconnectedPlayers =
    game.players.filter(
      player =>
        !player.connected &&
        !player.abandoned
    );

  if (disconnectedPlayers.length > 0) {

    game.status = GAME_STATUS.PAUSED;

    return;
  }

  if (game.winner) {
    return;
  }

  game.status = GAME_STATUS.PLAYING;
}

module.exports = checkPausedState;