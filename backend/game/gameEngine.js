const {
  COLORS,
  GAME_STATUS
} = require('./constants');

const canJoinGame = require('./validators/canJoinGame');
const canRollDice = require('./validators/canRollDice');
const canMovePiece = require('./validators/canMovePiece');

const applyMove = require('./rules/applyMove');
const nextTurn = require('./rules/nextTurn');
const checkCapture = require('./rules/checkCapture');
const checkWin = require('./rules/checkWin');

const createPieces = require('./utils/createPieces');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function addPlayerToGame(game, userId) {

  game.players.push({
    id: userId,
    color: COLORS[game.players.length],
    connected: true,
    pieces: createPieces()
  });

  if (game.players.length >= 2) {

    game.status = GAME_STATUS.PLAYING;

    game.turn = game.players[0].id;
  }
}

function executeMove(game, playerId, pieceIndex) {

  const validation = canMovePiece(
    game,
    playerId,
    pieceIndex
  );

  if (!validation.ok) {
    return validation;
  }

  applyMove(game, playerId, pieceIndex);

  checkCapture(game, playerId);

  const won = checkWin(game, playerId);

  if (won) {

    game.status = GAME_STATUS.FINISHED;

    game.winner = playerId;

    return {
      ok: true,
      finished: true
    };
  }

  nextTurn(game);

  game.dice = null;

  return {
    ok: true
  };
}

module.exports = {
  rollDice,
  addPlayerToGame,
  executeMove,
  canJoinGame,
  canRollDice
};