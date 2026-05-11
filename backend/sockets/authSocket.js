const jwt = require('jsonwebtoken');

function authSocket(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token)
    return next(new Error("No token"));

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    socket.user = decoded;

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
}

module.exports = authSocket;