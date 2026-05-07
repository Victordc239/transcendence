const initSockets = require('./sockets');

const httpServer = http.createServer(app);

initSockets(httpServer);