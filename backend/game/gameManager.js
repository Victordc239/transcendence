const pool = require('../db');

/* =============================
   CREATE GAME
============================= */
async function createGame(game, hostId)
{
	try
	{
		await pool.query(
			`
			INSERT INTO games (id, host_id, state, status)
			VALUES ($1, $2, $3, $4)
			`,
			[
				game.id,
				hostId,
				JSON.stringify(game),
				game.status
			]
		);

		return true;
	}
	catch (err)
	{
		console.error('createGame error:', err);
		return false;
	}
}

/* =============================
   GET GAME
============================= */
async function getGame(gameId) {
	try {
		const result = await pool.query(
			`
			SELECT state
			FROM games
			WHERE id = $1
			`,
			[gameId]
		);

		if (result.rows.length === 0) return null;

		const state = result.rows[0].state;

		if (!state) return null;

		if (typeof state === 'string')
		{
			try
			{
				return JSON.parse(state);
			}
			catch (err)
			{
				console.error(
					'❌ Corrupted game state:',
					gameId,
					err
				);

				return null;
			}
		}

		// JSONB ya parseado
		return state;
	}
	catch (err) {
		console.error('getGame error:', err);
		return null;
	}
}

/* =============================
   SAVE GAME
============================= */
async function saveGame(game)
{
	try
	{
		await pool.query(
			`
			UPDATE games
			SET state = $1,
				status = $2,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $3
			`,
			[
				JSON.stringify(game),
				game.status,
				game.id
			]
		);

		return true;
	}
	catch (err)
	{
		console.error('saveGame error:', err);
		return false;
	}
}

/* =============================
   DELETE GAME
============================= */
async function deleteGame(gameId)
{
	try
	{
		await pool.query(
			`
			DELETE FROM games
			WHERE id = $1
			`,
			[gameId]
		);

		return true;
	}
	catch (err)
	{
		console.error('deleteGame error:', err);
		return false;
	}
}

module.exports = {
	createGame,
	getGame,
	saveGame,
	deleteGame
};