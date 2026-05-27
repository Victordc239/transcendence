const { COLORS, GAME_STATUS } = require('./constants');

const canMovePiece = require('./validators/canMovePiece');
const applyMove = require('./rules/applyMove');
const nextTurn = require('./rules/nextTurn');
const checkCapture = require('./rules/checkCapture');
const checkWin = require('./rules/checkWin');
const createPieces = require('./utils/createPieces');
const { startTurnTimer } = require('./turnTimer');

function rollDice() {
	return Math.floor(Math.random() * 6) + 1;
}

function addPlayerToGame(game, userId)
{
	if (game.players.length >= 4)
	{
		return { error: 'Game full' };
	}

	const color = COLORS[game.players.length];

	if (!color)
	{
		return { error: 'No available colors for player' };
	}

	game.players.push({
		id: userId,
		color,
		connected: true,
		disconnectedAt: null,
		abandoned: false,
		pieces: createPieces()
	});

	if (game.players.length >= 2 && game.status === GAME_STATUS.WAITING)
	{
		game.status = GAME_STATUS.PLAYING;
		game.turn = game.players[0].id;
		startTurnTimer(game.id);
	}

	return { ok: true };
}

function executeMove(game, playerId, pieceIndex) {
	const validation = canMovePiece(game, playerId, pieceIndex);
	if (!validation.ok) return validation;

	applyMove(game, playerId, pieceIndex);
	checkCapture(game, playerId);

	const won = checkWin(game, playerId);

	if (won) {
		const { clearTurnTimer } = require('./turnTimer');
		clearTurnTimer(game.id);

		game.status = GAME_STATUS.FINISHED;
		game.winner = playerId;

		return { ok: true, finished: true };
	}

	if (game.dice !== 6) {
		nextTurn(game);
	}

	game.dice = null;
	game.updatedAt = Date.now();

	startTurnTimer(game.id);

	return { ok: true };
}

module.exports = {
	rollDice,
	addPlayerToGame,
	executeMove
};