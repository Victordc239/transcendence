const createPieces = require('./utils/createPieces');

const {
  GAME_STATUS
} = require('./constants');

function createNewGame(hostId) {

  return {
    id: Date.now().toString(),

    players: [
      {
        id: hostId,
        color: "pink",
        connected: true,
        pieces: createPieces()
      }
    ],

    turn: hostId,

    dice: null,

    winner: null,

    status: GAME_STATUS.WAITING
  };
}

module.exports = {
  createNewGame
};