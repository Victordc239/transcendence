const pool = require('../db');

async function withGameLock(gameId, callback)
{
	const client = await pool.connect();

	try
	{
		await client.query('BEGIN');

		const result = await client.query(
			`
			SELECT state
			FROM games
			WHERE id = $1
			FOR UPDATE
			`,
			[gameId]);

		if (result.rows.length === 0)
		{
			await client.query('ROLLBACK');
			return null;
		}

		const game = result.rows[0].state;

		const callbackResult = await callback(game, client);

		await client.query(
			`
			UPDATE games
			SET
				state = $1,
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
		await client.query('COMMIT');
		return { game, result: callbackResult };
	}
	catch (error)
	{
		await client.query('ROLLBACK');
		throw error;
	}
	finally
	{
		client.release();
	}
}

module.exports = withGameLock;