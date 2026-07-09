const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
	validateUsername,
	validateEmail,
	validatePassword
} = require('../utils/validation');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
	try
	{
		const { username, email, password } = req.body;

		if (!username || !email || !password)
			return res.status(400).json({ error: 'Faltan datos' });

		const usernameValidation = validateUsername(username);
		if (!usernameValidation.ok)
			return res.status(400).json({ error: usernameValidation.error });

		const emailValidation = validateEmail(email);
		if (!emailValidation.ok)
			return res.status(400).json({ error: emailValidation.error });

		const passwordValidation = validatePassword(password);
		if (!passwordValidation.ok)
			return res.status(400).json({ error: passwordValidation.error });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(passwordValidation.value, salt);

		const newUser = await pool.query(
			`
			INSERT INTO users (
				username,
				email,
				password
			)
			VALUES ($1, $2, $3)
			RETURNING
				id,
				username,
				email,
				avatar_url,
				created_at
			`,
			[
				usernameValidation.value,
				emailValidation.value,
				hashedPassword
			]
		);

		return res.status(201).json({
			message: 'Usuario creado',
			user: newUser.rows[0]
		});
	}
	catch (error)
	{
		console.error(error);

		if (error.code === '23505')
			return res.status(400).json({
				error: 'El usuario o email ya existe'
			});

		return res.status(500).json({
			error: 'Error en el servidor'
		});
	}
};

exports.login = async (req, res) => {
	try
	{
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({
				error: 'Faltan datos'
			});

		const emailValidation = validateEmail(email);
		if (!emailValidation.ok)
			return res.status(400).json({
				error: emailValidation.error
			});

		const passwordValidation = validatePassword(password);
		if (!passwordValidation.ok)
			return res.status(400).json({
				error: passwordValidation.error
			});

		const result = await pool.query(
			`
			SELECT *
			FROM users
			WHERE email = $1
			`,
			[emailValidation.value]
		);

		if (result.rows.length === 0)
			return res.status(400).json({
				error: 'Credenciales inválidas'
			});

		const user = result.rows[0];

		const validPassword = await bcrypt.compare(
			passwordValidation.value,
			user.password
		);

		if (!validPassword)
			return res.status(400).json({
				error: 'Credenciales inválidas'
			});

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				username: user.username
			},
			JWT_SECRET,
			{
				expiresIn: '24h'
			}
		);

		return res.json({
			message: 'Login correcto',
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				avatar_url: user.avatar_url
			}
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