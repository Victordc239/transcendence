const getBoardCoordinates = require('./getBoardCoordinates');
const getRealBoardPosition = require('./getRealBoardPosition');

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
				let position = -1;
				let coords = null;
				if (piece.steps >= 0)
				{
					if (piece.steps < 68)
					{
						position = getRealBoardPosition(player.color, piece.steps);
						coords = getBoardCoordinates(position);
					}
				}

				return {
					id: piece.id,
					state: piece.state,
					steps: piece.steps,
					position,
					coords
				};
			})
		}))
	};
}

module.exports = normalizeGame;