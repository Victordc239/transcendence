const getBoardCoordinates = require('./getBoardCoordinates');
const getRealBoardPosition = require('./getRealBoardPosition');
const HOME_STRETCH_MAP = require('./homeStretchMap');
const { MAIN_TRACK_SIZE } = require('../constants');
const pool = require('../../db');

//function normalizeGame(game)
async function normalizeGame(game)
{
	if (!game || !Array.isArray(game.players))
	{
		console.error('Invalid game passed to normalizeGame:', game);
		return (null);
	}

	/*if (!game)
		return game;*/

	const usersResult = await pool.query(
		`
		SELECT
			id,
			username,
			avatar_url
		FROM users
		WHERE id = ANY($1)
		`,
		[game.players.map(player => player.id)]
	);

	const users = new Map(
		usersResult.rows.map(user => [
			user.id,
			user
		])
	);

	return {
		id: game.id,
		status: game.status,
		turn: game.turn,
		dice: game.dice,
		lastDice: game.lastDice,
		consecutiveSixes: game.consecutiveSixes || {},
		lastMovedPiece: game.lastMovedPiece || null,
		winner: game.winner,
		createdAt: game.createdAt,
		updatedAt: game.updatedAt,
		players: game.players.map(player => {

			const user = users.get(player.id);

			return {
				id: player.id,
				username: user?.username ?? "Unknown",
				avatar_url: user?.avatar_url ?? null,
				color: player.color,
				connected: player.connected,
				abandoned: player.abandoned,
				pieces: player.pieces.map(piece => {

					let position = -1;
					let coords = null;
					if (piece.steps >= 0)
					{
						// recorrido exterior
						if (piece.steps < MAIN_TRACK_SIZE)
						{
							position = getRealBoardPosition(player.color, piece.steps);
							coords = getBoardCoordinates(position);
						}
						else
						{
							// pasillo final
							const stretchIndex = piece.steps - MAIN_TRACK_SIZE;
							coords = HOME_STRETCH_MAP[player.color]?.[stretchIndex] || null;
							position = piece.steps;
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
			};
		})
	};
}

module.exports = normalizeGame;