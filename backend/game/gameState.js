const createPieces = require('./utils/createPieces');

const { GAME_STATUS } = require('./constants');

function createNewGame(hostId)
{
	return{
		id: Date.now().toString(),

		players: [
			{
				id: hostId,
				color: "pink",
				connected: true,
				disconnectedAt: null,
				abandoned: false,
				pieces: createPieces()
			}
		],
		turn: hostId,
		dice: null,
		lastDice: null,
		consecutiveSixes: {},
		lastMovedPiece: null,
		winner: null,
		status: GAME_STATUS.WAITING,
		createdAt: Date.now(),
		updatedAt: Date.now()
	};
}

module.exports = { createNewGame };