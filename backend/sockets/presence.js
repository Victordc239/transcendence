const onlineUsers = new Map();

/*
  Estructura:

  onlineUsers = Map {
    userId => Set(socketId)
  }
*/

function addUserSocket(userId, socketId) {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId).add(socketId);
}

function removeUserSocket(userId, socketId) {
  if (!onlineUsers.has(userId)) {
    return;
  }

  const sockets = onlineUsers.get(userId);

  sockets.delete(socketId);

  if (sockets.size === 0) {
    onlineUsers.delete(userId);
  }
}

function isUserOnline(userId) {
  return onlineUsers.has(userId);
}

function getOnlineUsers() {
  return Array.from(onlineUsers.keys());
}

module.exports = {
  addUserSocket,
  removeUserSocket,
  isUserOnline,
  getOnlineUsers
};