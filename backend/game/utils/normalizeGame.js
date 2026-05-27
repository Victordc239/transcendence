function normalizeGame(game) {
	if (!game) return game;

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

			// 🔥 NORMALIZACIÓN CLAVE PARA FRONTEND
			pieces: player.pieces.map(piece => ({
				id: piece.id,
				state: piece.state,

				// frontend-friendly fields
				position:
					piece.state === "base" ? -1 :
					piece.state === "finished" ? 999 :
					piece.trackIndex ?? piece.homeIndex ?? 0,

				trackIndex: piece.trackIndex,
				homeIndex: piece.homeIndex
			}))
		}))
	};
}

module.exports = normalizeGame;