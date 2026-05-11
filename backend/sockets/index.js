const { Server } = require('socket.io');

const authSocket = require('./authSocket');
const registerGameSocket = require('./gameSocket');

const {
  addUserSocket,
  removeUserSocket
} = require('./presence');

function initSockets(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.use(authSocket);

  io.on("connection", (socket) => {

    const userId = socket.user.id;

    console.log("User connected:", userId);

    /* -----------------------------
       USER ONLINE
    ------------------------------ */

    addUserSocket(userId, socket.id);

    io.emit("presence:update", {
      userId,
      online: true
    });

    /* -----------------------------
       REGISTER GAME EVENTS
    ------------------------------ */

    registerGameSocket(io, socket);

    /* -----------------------------
       DISCONNECT
    ------------------------------ */

    socket.on("disconnect", () => {

      console.log("User disconnected:", userId);

      removeUserSocket(userId, socket.id);

      io.emit("presence:update", {
        userId,
        online: false
      });
    });
  });
}

module.exports = initSockets;