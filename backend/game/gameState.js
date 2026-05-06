function createNewGame(hostId) {
  return {
    id: Date.now().toString(),
    players: [
      {
        id: hostId,
        color: "red",
        pieces: [
          { position: "base" },
          { position: "base" },
          { position: "base" },
          { position: "base" }
        ]
      }
    ],
    turn: hostId,
    dice: null,
    status: "waiting", // waiting | playing | finished
  };
}

module.exports = { createNewGame };