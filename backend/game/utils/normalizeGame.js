const getBoardCoordinates = require('./getBoardCoordinates');

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
		lastDice: game.lastDice,
		winner: game.winner,
		createdAt: game.createdAt,
		updatedAt: game.updatedAt,

		players: game.players.map(player => ({
			id: player.id,
			color: player.color,
			connected: player.connected,
			abandoned: player.abandoned,

			pieces: player.pieces.map(piece => {

				let coords = null;

				if (piece.state !== 'base')
				{
					coords = getBoardCoordinates(piece.position);
				}

				return {
					id: piece.id,
					state: piece.state,
					position: piece.position,

					// 🔥 NUEVO: para frontend
					coords
				};
			})
		}))
	};
}

module.exports = normalizeGame;