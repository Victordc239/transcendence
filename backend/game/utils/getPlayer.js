function getPlayer(game, playerId)
{
	return game.players.find( player => player.id === playerId);
}

module.exports = getPlayer;