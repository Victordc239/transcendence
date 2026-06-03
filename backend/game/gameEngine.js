const { COLORS, GAME_STATUS } =require('./constants');
const canMovePiece = require('./validators/canMovePiece');
const applyMove = require('./rules/applyMove');
const nextTurn = require('./rules/nextTurn');
const checkCapture = require('./rules/checkCapture');
const checkWin = require('./rules/checkWin');
const createPieces = require('./utils/createPieces');
const {startTurnTimer, clearTurnTimer} = require('./turnTimer');

function rollDice()
{
	return Math.floor(Math.random() * 6) + 1;
}

function addPlayerToGame(game, userId)
{
	if (game.players.length >= 4)
	{
		return {
			error: 'Game full'
		};
	}

	const alreadyInGame = game.players.find(player => player.id === userId);
	if (alreadyInGame)
	{
		return {
			error: 'Already in game'
		};
	}

	const color = COLORS[game.players.length];

	game.players.push({
		id: userId,
		color,
		connected: true,
		disconnectedAt: null,
		abandoned: false,
		pieces: createPieces()
	});

	game.updatedAt = Date.now();

	return {
		ok: true
	};
}

function executeMove(game, playerId, pieceIndex)
{
	const validation = canMovePiece(game, playerId, pieceIndex);
	if (!validation.ok)
	{
		return validation;
	}

	const movedPiece = applyMove(game, playerId, pieceIndex);
	checkCapture(game, playerId, movedPiece);
	const won = checkWin(game, playerId);
	if (won)
	{
		clearTurnTimer(game.id);
		game.status = GAME_STATUS.FINISHED;
		game.winner =playerId;

		return {
			ok: true,
			finished: true
		};
	}

	if (game.dice !== 6)
	{
		nextTurn(game);
	}

	game.dice = null;
	game.updatedAt = Date.now();

	startTurnTimer(game.id);
	return {
		ok: true
	};
}

module.exports = {rollDice, addPlayerToGame, executeMove};