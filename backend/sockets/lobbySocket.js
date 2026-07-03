const pool = require('../db');

function registerLobbySocket(io, socket) {
	socket.on('lobby:getHistory', async () => {
		try {
			const result = await pool.query(`
				SELECT
					m.id,
					m.message,
					m.created_at,
					u.id as user_id,
					u.username,
					u.avatar_url
				FROM lobby_messages m
				JOIN users u ON u.id = m.user_id
				WHERE u.id NOT IN (
					SELECT blocked_id
					FROM blocked_users
					WHERE blocker_id = $1
				)
				ORDER BY m.created_at ASC
				LIMIT 50
			`, [socket.user.id]);

			const messages = result.rows.map(row => ({
				id: row.id,
				message: row.message,
				created_at: row.created_at,
				user: {
					id: row.user_id,
					username: row.username,
					avatar_url: row.avatar_url
				}
			}));

			socket.emit('lobby:history', messages);
		} catch (err) {
			console.error('LOBBY HISTORY ERROR:', err);
		}
	});

	socket.on('lobby:send', async ({ message }) => {
		try {
			if (!message || !message.trim()) return;

			const insertResult = await pool.query(
				`
				INSERT INTO lobby_messages (user_id, message)
				VALUES ($1, $2)
				RETURNING *
				`,
				[socket.user.id, message.trim()]
			);

			const userResult = await pool.query(
				`
				SELECT id, username, avatar_url
				FROM users
				WHERE id = $1
				`,
				[socket.user.id]
			);

			io.emit('lobby:message', {
				id: insertResult.rows[0].id,
				message: insertResult.rows[0].message,
				created_at: insertResult.rows[0].created_at,
				user: userResult.rows[0]
			});
		} catch (err) {
			console.error('LOBBY SEND ERROR:', err);
		}
	});

	socket.on('lobby:blockUser', async ({ blockedUserId }) => {
		try {
			if (!blockedUserId) return;
			if (blockedUserId === socket.user.id) return;

			await pool.query(
				`
				INSERT INTO blocked_users (blocker_id, blocked_id)
				VALUES ($1, $2)
				ON CONFLICT (blocker_id, blocked_id) DO NOTHING
				`,
				[socket.user.id, blockedUserId]
			);

			socket.emit('lobby:userBlocked', { blockedUserId });
		} catch (err) {
			console.error('BLOCK USER ERROR:', err);
		}
	});

	socket.on('lobby:invite', ({ targetUserId }) => {
		socket.broadcast.emit('lobby:invite', {
			from: socket.user.username,
			fromId: socket.user.id,
			targetUserId
		});
	});

	socket.on('lobby:typing', () => {
		socket.broadcast.emit('lobby:typing', {
			userId: socket.user.id
		});
	});
}

module.exports = registerLobbySocket;