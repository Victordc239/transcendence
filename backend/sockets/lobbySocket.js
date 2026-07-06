const pool = require('../db');
const { getIO } = require("../socket");
const { getOnlineUsers } = require("./presence");

function sendLobbySystemMessage(message) {
	getIO().emit("lobby:system", {
		id: Date.now(),
		message,
		created_at: new Date().toISOString()
	});
}

function registerLobbySocket(io, socket) {
	socket.on('lobby:getHistory', async () => {
		try {
			const result = await pool.query(`
				SELECT
					m.id,
					m.message,
					m.created_at,
					m.expected_reads,
					m.read_by,
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
				expected_reads: row.expected_reads,
				read_by: row.read_by,
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
			if (!message || !message.trim())
				return;
			
			const expectedReads = Math.max(getOnlineUsers().length, 1);
			const insertResult = await pool.query(
				`
				INSERT INTO lobby_messages
				(
					user_id,
					message,
					expected_reads,
					read_by
				)
				VALUES
				(
					$1,
					$2,
					$3,
					ARRAY[$1]::INTEGER[]
				)
				RETURNING *
				`,
				[socket.user.id, message.trim(), expectedReads]
			);

			const userResult = await pool.query(
				`
				SELECT id, username, avatar_url
				FROM users
				WHERE id = $1
				`,
				[socket.user.id]
			);

			io.emit("lobby:message", {
				id: insertResult.rows[0].id,
				message: insertResult.rows[0].message,
				created_at: insertResult.rows[0].created_at,

				expected_reads: insertResult.rows[0].expected_reads,
				read_by: insertResult.rows[0].read_by,

				user: userResult.rows[0],
			});
		}
		catch (err)
		{
			console.error('LOBBY SEND ERROR:', err);
		}
	});

	socket.on("lobby:read", async ({ messageId }) => {
		try {
			const result = await pool.query(
				`
				UPDATE lobby_messages
				SET read_by = array_append(read_by, $2)
				WHERE
					id = $1
					AND NOT ($2 = ANY(read_by))
				RETURNING id, expected_reads, read_by
				`,
				[
					messageId,
					socket.user.id,
				]
			);

			if (result.rows.length === 0)
				return;

			io.emit("lobby:readUpdate", {
				id: result.rows[0].id,
				expected_reads: result.rows[0].expected_reads,
				read_by: result.rows[0].read_by,
			});
		}
		catch (err) {
			console.error("READ RECEIPT ERROR:", err);
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

module.exports = {
	registerLobbySocket,
	sendLobbySystemMessage
};