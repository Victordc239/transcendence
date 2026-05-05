const { createNewGame } = require('../game/gameState');

let games = {};

exports.createGame = (req, res) => {
  const userId = req.user.id;

  const game = createNewGame(userId);
  games[game.id] = game;

  res.json(game);
};

exports.getGame = (req, res) => {
  const game = games[req.params.id];

  if (!game) return res.status(404).json({ error: 'Game not found' });

  res.json(game);
};