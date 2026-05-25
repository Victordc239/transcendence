function isGameAbandoned(game)
{
	return game.players.every(player => !player.connected);
}

module.exports = isGameAbandoned;