const games = {};

function getGame(gameId) {
  return games[gameId];
}

function saveGame(game) {
  games[game.id] = game;
}

function createGame(game) {
  games[game.id] = game;
}

module.exports = {
  games,
  getGame,
  saveGame,
  createGame
};