const pool = require('../db');
const { isUserOnline } = require('../sockets/presence');
const {validateUsername, validateId, validateText} = require('../utils/validation');

exports.getMe = async (req, res) => {
	try
	{
		const userId = req.user.id;
		const result = await pool.query(
			`
			SELECT
				id,
				username,
				email,
				avatar_url,
				created_at,
				updated_at
			FROM users
			WHERE id = $1
			`,
			[userId]
		);

		if (result.rows.length === 0)
			return res.status(404).json({
				error: 'Usuario no encontrado'
			});

		const user = result.rows[0];

		return res.json({
			...user,
			online: true
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			error: 'Error en el servidor'
		});
	}
};

exports.updateMe = async (req, res) => {
	try
	{
		const userId = req.user.id;
		let { username, avatar_url } = req.body;

		if (!username && !avatar_url)
		{
			return res.status(400).json({
				error: 'No hay datos para actualizar'
			});
		}

		if (username)
		{
			const usernameValidation = validateUsername(username);

			if (!usernameValidation.ok)
			{
				return res.status(400).json({
					error: usernameValidation.error
				});
			}

			username = usernameValidation.value;

			const usernameExists = await pool.query(
				`
				SELECT id
				FROM users
				WHERE username = $1
				AND id != $2
				`,
				[
					username,
					userId
				]
			);

			if (usernameExists.rows.length > 0)
			{
				return res.status(400).json({
					error: 'El nombre de usuario ya está en uso'
				});
			}
		}

		if (avatar_url)
		{
			if (typeof avatar_url !== 'string')
			{
				return res.status(400).json({
					error: 'Avatar inválido'
				});
			}

			avatar_url = avatar_url.trim();

			if (avatar_url.length > 255)
			{
				return res.status(400).json({
					error: 'Avatar demasiado largo'
				});
			}
		}

		const result = await pool.query(
			`
			UPDATE users
			SET
				username = COALESCE($1, username),
				avatar_url = COALESCE($2, avatar_url),
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $3
			RETURNING
				id,
				username,
				email,
				avatar_url,
				created_at,
				updated_at
			`,
			[
				username || null,
				avatar_url || null,
				userId
			]
		);

		return res.json({
			success: true,
			user: result.rows[0]
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			error: 'Error en el servidor'
		});
	}
};

exports.getUserById = async (req, res) => {
	try
	{
		const idValidation = validateId(req.params.id);

		if (!idValidation.ok)
		{
			return res.status(400).json({
				error: idValidation.error
			});
		}

		const result = await pool.query(
			`
			SELECT
				id,
				username,
				avatar_url,
				created_at
			FROM users
			WHERE id = $1
			`,
			[idValidation.value]
		);

		if (result.rows.length === 0)
		{
			return res.status(404).json({
				error: 'Usuario no encontrado'
			});
		}

		const user = result.rows[0];

		return res.json({
			...user,
			online: isUserOnline(user.id)
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			error: 'Error en el servidor'
		});
	}
};

exports.searchUsers = async (req, res) => {
	try
	{
		const userId = req.user.id;
		const query = req.query.q;

		if (!query)
			return res.json({
				users: []
			});

		const queryValidation = validateText(query, 50);

		if (!queryValidation.ok)
			return res.json({
				users: []
			});

		const result = await pool.query(
			`
			SELECT
				id,
				username,
				avatar_url
			FROM users
			WHERE
				LOWER(username) LIKE LOWER($1)
				AND id != $2
			ORDER BY username ASC
			LIMIT 20
			`,
			[
				`%${queryValidation.value}%`,
				userId
			]
		);

		const users = result.rows.map(user => ({
			...user,
			online: isUserOnline(user.id)
		}));

		return res.json({
			users
		});
	}
	catch (error)
	{
		console.error(error);

		return res.status(500).json({
			error: 'Error en el servidor'
		});
	}
};