function setPlayerConnection(
  game,
  playerId,
  connected
) {

  const player = game.players.find(
    p => p.id === playerId
  );

  if (!player) {
    return;
  }

  player.connected = connected;

  if (connected) {

    player.disconnectedAt = null;

    return;
  }

  player.disconnectedAt = Date.now();
}

module.exports = setPlayerConnection;