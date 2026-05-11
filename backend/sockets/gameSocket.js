const {
  getGame
} = require('../game/gameManager');

function registerGameSocket(io, socket) {

  /* -----------------------------
     JOIN GAME ROOM
  ------------------------------ */
  socket.on("game:join", ({ gameId }) => {

    const game = getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    socket.join(gameId);

    console.log(
      `User ${socket.user.id} joined room ${gameId}`
    );

    socket.emit("game:update", game);
  });

  /* -----------------------------
     GET GAME STATE
  ------------------------------ */
  socket.on("game:state", ({ gameId }) => {

    const game = getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    socket.emit("game:update", game);
  });

}

module.exports = registerGameSocket;