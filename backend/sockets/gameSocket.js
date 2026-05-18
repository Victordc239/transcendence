const {
  getGame
} = require('../game/gameManager');

function registerGameSocket(io, socket) {

  /* -----------------------------
     JOIN GAME ROOM
  ------------------------------ */
  socket.on("game:join", async ({ gameId }) => {

    const game = await getGame(gameId);

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
  socket.on("game:state", async ({ gameId }) => {

    const game = await getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    socket.emit("game:update", game);
  });

  /* -----------------------------
     CHAT MESSAGE
  ------------------------------ */
  socket.on("chat:send", async ({ gameId, message }) => {

    const game = await getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    const player = game.players.find(
      p => p.id === socket.user.id
    );

    if (!player) {
      return socket.emit("error", {
        message: "You are not in this game"
      });
    }

    if (!message || typeof message !== "string") {
      return;
    }

    const cleanMessage = message.trim();

    if (cleanMessage.length === 0) {
      return;
    }

    if (cleanMessage.length > 200) {
      return socket.emit("error", {
        message: "Message too long"
      });
    }

    const chatMessage = {
      userId: socket.user.id,
      username: socket.user.username,
      message: cleanMessage,
      createdAt: new Date().toISOString()
    };

    io.to(gameId).emit(
      "chat:message",
      chatMessage
    );
  });

}

module.exports = registerGameSocket;