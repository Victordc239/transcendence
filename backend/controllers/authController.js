const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    // Verificar si ya existe
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guardar usuario
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuario creado',
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    // Buscar usuario
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Crear token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};