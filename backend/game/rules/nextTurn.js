function nextTurn(game)
{
	const currentIndex = game.players.findIndex(player => player.id === game.turn);
	const nextIndex = (currentIndex + 1) % game.players.length;
	game.turn = game.players[nextIndex].id;
}

module.exports = nextTurn;