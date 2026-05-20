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
}

module.exports = setPlayerConnection;