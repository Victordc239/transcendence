const getAvailableMoves = require('../game/rules/getAvailableMoves');
const nextTurn = require('../game/rules/nextTurn');

const { createNewGame } = require('../game/gameState');
const { rollDice, addPlayerToGame, executeMove, canJoinGame, canRollDice} = require('../game/gameEngine');
const { getGame: getGameById, createGame, saveGame} = require('../game/gameManager');
const { getIO } = require('../socket');

/* =============================
   CREATE GAME
============================= */

exports.createGame = async (req, res) => {
	try
	{
		const userId = req.user.id;

		const game = createNewGame(userId);

		await createGame(game);

		getIO().emit("game:created", game);

		res.json(game);

	}
	catch (error)
	{
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

/* =============================
GET GAME
============================= */

exports.getGame = async (req, res) => {
	try
	{
		const game = await getGameById(req.params.id);

		if (!game)
		{
			return res.status(404).json({ error: "Game not found" });
		}
		res.json(game);

	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ error: "Server error" });
	}
};

/* =============================
JOIN GAME
============================= */

exports.joinGame = async (req, res) => {
	try {
		const game = await getGameById(req.params.id);

		if (!game)
		{
			return res.status(404).json({ error: "Game not found" });
		}

		const userId = req.user.id;
		const validation = canJoinGame(game, userId);

		if (!validation.ok)
		{
			return res.status(400).json({ error: validation.error });
		}

		addPlayerToGame(game, userId);
		await saveGame(game);

		getIO()
			.to(game.id)
			.emit("game:update", game);

		res.json(game);
	}
	catch (error)
	{
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

/* =============================
ROLL DICE
============================= */

exports.rollDice = async (req, res) => {
	try
	{
		const game = await getGameById(req.params.id);

		if (!game)
		{
			return res.status(404).json({ error: "Game not found" });
		}

		const userId = req.user.id;
		const validation = canRollDice(game, userId);

		if (!validation.ok)
		{
			return res.status(400).json({ error: validation.error });
		}

		game.dice = rollDice();
		const availableMoves = getAvailableMoves(game, userId);

		if (availableMoves.length === 0)
		{
			game.dice = null;
			nextTurn(game);
		}
		await saveGame(game);
		getIO()
			.to(game.id)
			.emit("game:update", game);

		res.json({ dice: game.dice });
	}
	catch (error)
	{
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

/* =============================
MOVE PIECE
============================= */

exports.movePiece = async (req, res) => {
	try
	{
		const game = await getGameById(req.params.id);

		if (!game)
		{
			return res.status(404).json({ error: "Game not found" });
		}

		const userId = req.user.id;
		const {pieceIndex} = req.body;
		const result = executeMove(game, userId, pieceIndex);

		if (!result.ok)
		{
			return res.status(400).json({ error: result.error });
		}

		await saveGame(game);

		getIO()
			.to(game.id)
			.emit("game:update", game);

		res.json(game);
	}
	catch (error)
	{
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};