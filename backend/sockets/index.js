const { Server } = require('socket.io');

const socketAuth = require('./socketAuth');
const registerGameSocket = require('./gameSocket');

function initSockets(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    registerGameSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initSockets;