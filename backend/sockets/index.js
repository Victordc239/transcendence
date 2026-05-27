const { Server } = require('socket.io');
const authSocket = require('./authSocket');
const registerGameSocket = require('./gameSocket');
const {addUserSocket, removeUserSocket} = require('./presence');
const { setIO } = require('../socket');

function initSockets(httpServer)
{
	const io = new Server(httpServer, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
			credentials: true
		}
	});

	setIO(io);
	io.use(authSocket);
	io.on('connection', (socket) => {

		const userId = socket.user.id;
		addUserSocket(userId, socket.id);
		io.emit('presence:update', {userId, online: true});
		registerGameSocket(io, socket);
		socket.on('disconnect', () => {
			removeUserSocket(userId, socket.id);
			io.emit('presence:update', {userId, online: false});
		});
	});
}

module.exports = initSockets;