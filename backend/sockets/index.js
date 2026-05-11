const { Server } = require('socket.io');

const authSocket = require('./authSocket');
const registerGameSocket = require('./gameSocket');

function initSockets(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.use(authSocket);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    registerGameSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initSockets;