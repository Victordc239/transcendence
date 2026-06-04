const getAvailableMoves = require('../game/rules/getAvailableMoves');
const nextTurn = require('../game/rules/nextTurn');
const { createNewGame } = require('../game/gameState');
const { rollDice, addPlayerToGame, executeMove} = require('../game/gameEngine');
const canJoinGame = require('../game/validators/canJoinGame');
const canRollDice = require('../game/validators/canRollDice');
const { getGame: getGameById, createGame: createGameInDB} = require('../game/gameManager');
const withGameLock = require('../game/withGameLock');
const { getIO } = require('../socket');
const normalizeGame = require('../game/utils/normalizeGame');
const { startTurnTimer } = require('../game/turnTimer');

/* =============================
CREATE GAME
============================= */
exports.createGame = async (req, res) => {

	try
	{
		const userId = Number(req.user.id);
		if (!userId)
		{
			return res.status(401).json({
				error: 'Invalid user'
			});
		}

		const game = createNewGame(userId);

		const created = await createGameInDB(game, userId);
		if (!created)
		{
			return res.status(500).json({
				error:
					'Database error creating game'
			});
		}

		const normalized = normalizeGame(game);

		try
		{
			getIO().emit(
				'game:created',
				normalized
			);
		}
		catch (socketError)
		{
			console.error(
				'SOCKET ERROR:',
				socketError
			);
		}

		return res.status(201).json({
			id: normalized.id,
			game: normalized
		});
	}
	catch (error)
	{
		console.error('CREATE GAME ERROR:', error);
		return res.status(500).json({
			error:
				'Server error creating game',
			details: error.message
		});
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
			return res.status(404).json({
				error: 'Game not found'
			});
		}
		return res.json(normalizeGame(game));
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({
			error: 'Server error'
		});
	}
};

/* =============================
JOIN GAME
============================= */
exports.joinGame = async (req, res) => {
	try
	{
		const userId = Number(req.user.id);
		const gameId = String(req.params.id);

		const locked =await withGameLock(gameId,
			async (game) => {
				if (!game)
				{
					return {
						error:
							'Game not found'
					};
				}

				console.log('JOIN REQUEST',
					{
						gameId,
						userId,
						status: game.status,
						players: game.players.map(p => p.id)
					});

				// 🔥 VALIDAR JOIN
				const validation = canJoinGame(game, userId);
				if (!validation.ok)
				{
					return {
						error:
							validation.error
					};
				}

				// 🔥 AÑADIR JUGADOR
				if (!validation.rejoin)
				{
					const addResult = addPlayerToGame(game, userId);

					console.log('PLAYERS AFTER JOIN', game.players.map(p => ({
							id: p.id,
							color: p.color
						})));
					console.log(
						JSON.stringify(game.players, null, 2)
						);

					if (addResult && addResult.error)
					{
						return {
							error:
								addResult.error
						};
					}
				}
				game.updatedAt = Date.now();
				return {
					ok: true
				};
			});

		if (!locked)
		{
			return res.status(404).json({
				error:
					'Game not found'
			});
		}

		if (locked.result?.error)
		{
			return res.status(400).json({
				error:
					locked.result.error
			});
		}

		// 🔥 SOCKET UPDATE
		try
		{
			getIO()
				.to(gameId)
				.emit(
					'game:update',
					normalizeGame(locked.game));
		}
		catch (socketError)
		{
			console.error('SOCKET ERROR:', socketError);
		}
		return res.json(normalizeGame(locked.game));
	}
	catch (error)
	{
		console.error('JOIN GAME ERROR:', error);

		return res.status(500).json({
			error:
				'Server error joining game',
			details:
				error.message
		});
	}
};

/* =============================
ROLL DICE
============================= */
exports.rollDice = async (req, res) => {

	try
	{
		const userId = req.user.id;
		const gameId = req.params.id;
		const locked = await withGameLock(gameId,
			async (game) => {
				const validation = canRollDice(game, userId);
				if (!validation.ok)
				{
					return {
						error: validation.error
					};
				}
				if (validation.startGame)
				{
					game.status = 'playing';
					game.turn = game.players[0].id;
					startTurnTimer(game.id);
				}
				game.dice = rollDice();
				const availableMoves = getAvailableMoves(game, userId);
				if (availableMoves.length === 0)
				{
					game.lastDice = game.dice;
					nextTurn(game);
					setTimeout(async () => {
						try
						{
							await withGameLock(gameId,
								async (lockedGame) => {
									if (!lockedGame)
									{
										return {
											error: 'Game not found'
										};
									}
									lockedGame.dice = null;
									return {
										ok: true
									};
								});

							const refreshed = await getGameById(gameId);
							if (refreshed)
							{
								getIO()
									.to(gameId)
									.emit('game:update', normalizeGame(refreshed));
							}
						}
						catch (err)
						{
							console.error(err);
						}
					}, 1500);
				}
				game.updatedAt = Date.now();
				return {
					ok: true,
					dice: game.dice
				};
			});

		if (!locked)
		{
			return res.status(404).json({ error: 'Game not found' });
		}

		if (locked.result?.error)
		{
			return res.status(400).json({
				error: locked.result.error
			});
		}

		// 🔥 FIX: SIEMPRE NORMALIZADO
		const normalized = normalizeGame(locked.game);
		getIO()
			.to(gameId)
			.emit('game:update', normalized);

		return res.json({
			dice: locked.result.dice
		});
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({ error: 'Server error' });
	}
};

/* =============================
MOVE PIECE
============================= */
exports.movePiece = async (req, res) => {
	try
	{
		const userId = req.user.id;
		const gameId = req.params.id;
		const { pieceIndex } = req.body;
		const locked = await withGameLock(gameId,
			async (game) => {
				const result = executeMove(game, userId, pieceIndex);
				if (!result.ok)
				{
					return result;
				}
				game.updatedAt = Date.now();
				return result;
			});

		if (!locked)
		{
			return res.status(404).json({
				error:
					'Game not found'
			});
		}

		if (!locked.result?.ok)
		{
			return res.status(400).json({
				error: locked.result?.error || 'Move failed'
			});
		}

		const normalizeGame = require('../game/utils/normalizeGame');

		getIO()
			.to(gameId)
			.emit('game:update', normalizeGame(locked.game));

		return res.json(normalizeGame(locked.game));
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({
			error:
				'Server error'
		});
	}

};