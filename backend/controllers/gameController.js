const { createNewGame } = require('../game/gameState');
const {
  rollDice,
  movePiece,
  nextTurn,
  canJoinGame
} = require('../game/gameEngine');

let games = {};

/* -----------------------------
   CREATE GAME
------------------------------ */
exports.createGame = (req, res) => {
  const userId = req.user.id;

  const game = createNewGame(userId);
  games[game.id] = game;

  res.json(game);
};

/* -----------------------------
   GET GAME
------------------------------ */
exports.getGame = (req, res) => {
  const game = games[req.params.id];

  if (!game)
    return res.status(404).json({ error: 'Game not found' });

  res.json(game);
};

/* -----------------------------
   JOIN GAME
------------------------------ */
exports.joinGame = (req, res) => {
  const game = games[req.params.id];
  const userId = req.user.id;

  if (!game)
    return res.status(404).json({ error: 'Game not found' });

  const check = canJoinGame(game, userId);
  if (!check.ok)
    return res.status(400).json({ error: check.error });

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

  res.json(game);
};

/* -----------------------------
   ROLL DICE
------------------------------ */
exports.rollDice = (req, res) => {
  const game = games[req.params.id];
  const userId = req.user.id;

  if (!game)
    return res.status(404).json({ error: 'Game not found' });

  if (game.turn !== userId)
    return res.status(403).json({ error: 'Not your turn' });

  game.dice = rollDice();

  res.json({ dice: game.dice });
};

/* -----------------------------
   MOVE PIECE
------------------------------ */
exports.movePiece = (req, res) => {
  const game = games[req.params.id];
  const { pieceIndex } = req.body;
  const userId = req.user.id;

  if (!game)
    return res.status(404).json({ error: 'Game not found' });

  if (game.turn !== userId)
    return res.status(403).json({ error: 'Not your turn' });

  if (game.dice === null)
    return res.status(400).json({ error: 'Roll dice first' });

  const moved = movePiece(game, userId, pieceIndex);

  if (!moved)
    return res.status(400).json({ error: 'Invalid move' });

  nextTurn(game);
  game.dice = null;

  res.json(game);
};