function nextTurn(game)
{
	const currentIndex = game.players.findIndex(player => player.id === game.turn);
	let nextIndex = currentIndex;
	do
	{
		nextIndex = (nextIndex + 1) % game.players.length;
	}
	while (
		game.finishedPlayers.includes(game.players[nextIndex].id)
	);
	game.turn = game.players[nextIndex].id;
}

module.exports = nextTurn;