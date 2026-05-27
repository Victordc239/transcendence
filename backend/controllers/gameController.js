const getAvailableMoves = require('../game/rules/getAvailableMoves');
const nextTurn = require('../game/rules/nextTurn');
const { createNewGame } = require('../game/gameState');
const {rollDice, addPlayerToGame, executeMove, canJoinGame, canRollDice} = require('../game/gameEngine');
const { getGame: getGameById, createGame} = require('../game/gameManager');
const withGameLock = require('../game/withGameLock');
const { getIO } = require('../socket');
const normalizeGame = require('../game/utils/normalizeGame');

/* =============================
CREATE GAME
============================= */
exports.createGame = async (req, res) => {
	try
	{
		const userId = req.user.id;

		const game = createNewGame(userId);

		await createGame(game, userId);

		const normalized = normalizeGame(game);

		getIO().emit('game:created', normalized);

		// 🔥 FIX IMPORTANTE: respuesta consistente para frontend
		return res.json({
			id: normalized.id,
			game: normalized
		});
	}
	catch (error)
	{
		console.error("CREATE GAME ERROR:", error);
		return res.status(500).json({ error: 'Server error creating game' });
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
			return res.status(404).json({ error: 'Game not found' });
		}
		return res.json(normalizeGame(game));
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({ error: 'Server error' });
	}
};
/* =============================
JOIN GAME
============================= */
exports.joinGame = async (req, res) => {
	try {
		const userId = Number(req.user.id);
		const gameId = String(req.params.id);

		const locked = await withGameLock(gameId, async (game) => {
			if (!game) return { error: 'Game not found' };

			const validation = canJoinGame(game, userId);
			if (!validation.ok) {
				return { error: validation.error };
			}

			addPlayerToGame(game, userId);

			return { ok: true };
		});

		if (!locked) {
			return res.status(404).json({ error: 'Game not found' });
		}

		if (locked.result?.error) {
			return res.status(400).json({ error: locked.result.error });
		}

		getIO().to(gameId).emit('game:update', normalizeGame(locked.game));

		return res.json(normalizeGame(locked.game));
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Server error joining game',
			details: error.message
		});
	}
};

/* =============================
ROLL DICE
============================= */
exports.rollDice = async (req, res) => {

	try
	{
		console.log('ROLL DICE');

		const userId = req.user.id;
		const gameId = req.params.id;

		const locked = await withGameLock(
			gameId,
			async (game) => {

				const validation = canRollDice(game, userId);
				if (!validation.ok)
				{
					return { error: validation.error };
				}

				game.dice = rollDice();
				const availableMoves = getAvailableMoves(game, userId);
				if (availableMoves.length === 0)
				{
					game.dice = null;
					nextTurn(game);
				}

				game.updatedAt = Date.now();

				return {
					ok: true,
					dice: game.dice
				};
			}
		);

		if (!locked)
		{
			return res.status(404).json({error: 'Game not found'});
		}

		if (locked.result.error)
		{
			return res.status(400).json({error: locked.result.error});
		}

		getIO()
			.to(gameId)
			.emit('game:update', locked.game);

		return res.json({dice: locked.result.dice});
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({error: 'Server error'});
	}
};

/* =============================
MOVE PIECE
============================= */
exports.movePiece = async (req, res) => {

	try
	{
		console.log('MOVE PIECE');

		const userId = req.user.id;
		const gameId = req.params.id;

		const { pieceIndex } = req.body;

		const locked = await withGameLock(
			gameId,
			async (game) => {

				const result = executeMove(game, userId, pieceIndex);
				if (!result.ok)
				{
					return result;
				}
				game.updatedAt = Date.now();
				return result;
			}
		);

		if (!locked)
		{
			return res.status(404).json({error: 'Game not found'});
		}

		if (!locked.result.ok)
		{
			return res.status(400).json({error: locked.result.error});
		}

		getIO()
			.to(gameId)
			.emit('game:update', locked.game);

		return res.json(normalizeGame(locked.game));
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({error: 'Server error'});
	}
};