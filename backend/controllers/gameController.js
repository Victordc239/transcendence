const { createNewGame } = require('../game/gameState');

const {
  rollDice,
  movePiece,
  nextTurn,
  canJoinGame
} = require('../game/gameEngine');

const {
  getGame,
  createGame,
  saveGame
} = require('../game/gameManager');

/* -----------------------------
   CREATE GAME
------------------------------ */
exports.createGame = async (req, res) => {

  try {

    const userId = req.user.id;

    const game = createNewGame(userId);

    await createGame(game);

    res.json(game);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

/* -----------------------------
   GET GAME
------------------------------ */
exports.getGame = async (req, res) => {

  try {

    const game = await getGame(req.params.id);

    if (!game)
      return res.status(404).json({
        error: 'Game not found'
      });

    res.json(game);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

/* -----------------------------
   JOIN GAME
------------------------------ */
exports.joinGame = async (req, res) => {

  try {

    const game = await getGame(req.params.id);

    const userId = req.user.id;

    if (!game)
      return res.status(404).json({
        error: 'Game not found'
      });

    const check = canJoinGame(game, userId);

    if (!check.ok)
      return res.status(400).json({
        error: check.error
      });

    const colors = ["red", "blue", "green", "yellow"];

    game.players.push({
      id: userId,
      color: colors[game.players.length],
      pieces: [
        { position: "base" },
        { position: "base" },
        { position: "base" },
        { position: "base" }
      ]
    });

    if (game.players.length >= 2) {
      game.status = "playing";
    }

    await saveGame(game);

    res.json(game);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

/* -----------------------------
   ROLL DICE
------------------------------ */
exports.rollDice = async (req, res) => {

  try {

    const game = await getGame(req.params.id);

    const userId = req.user.id;

    if (!game)
      return res.status(404).json({
        error: 'Game not found'
      });

    if (game.turn !== userId)
      return res.status(403).json({
        error: 'Not your turn'
      });

    game.dice = rollDice();

    await saveGame(game);

    res.json({
      dice: game.dice
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

/* -----------------------------
   MOVE PIECE
------------------------------ */
exports.movePiece = async (req, res) => {

  try {

    const game = await getGame(req.params.id);

    const { pieceIndex } = req.body;

    const userId = req.user.id;

    if (!game)
      return res.status(404).json({
        error: 'Game not found'
      });

    if (game.turn !== userId)
      return res.status(403).json({
        error: 'Not your turn'
      });

    if (game.dice === null)
      return res.status(400).json({
        error: 'Roll dice first'
      });

    const moved = movePiece(
      game,
      userId,
      pieceIndex
    );

    if (!moved)
      return res.status(400).json({
        error: 'Invalid move'
      });

    nextTurn(game);

    game.dice = null;

    await saveGame(game);

    res.json(game);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};