function createNewGame(hostId) {
  return {
    id: Date.now().toString(),
    players: [
      {
        id: hostId,
        color: "red",
        pieces: [0, 0, 0, 0]
      }
    ],
    turn: hostId,
    dice: null,
    status: "waiting", // waiting | playing | finished
  };
}

module.exports = { createNewGame };