function normalizeGame(game)
{
	if (!game)
	{
		return game;
	}

	return {
		id: game.id,
		status: game.status,
		turn: game.turn,
		dice: game.dice,
		winner: game.winner,
		createdAt: game.createdAt,
		updatedAt: game.updatedAt,

		players: game.players.map(player => ({
			id: player.id,
			color: player.color,
			connected: player.connected,
			abandoned: player.abandoned,

			pieces: player.pieces.map(piece => ({
				id: piece.id,
				state: piece.state,

				/*
				🔥 EL FRONTEND NECESITA ESTO
				*/
				position: piece.position
			}))
		}))
	};
}

module.exports = normalizeGame;