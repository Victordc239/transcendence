const pool = require('../db');

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, username, email, avatar_url, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, avatar_url } = req.body;

    if (!username && !avatar_url) {
      return res.status(400).json({ error: 'No hay datos para actualizar' });
    }

    if (username) {
      const usernameExists = await pool.query(
        'SELECT id FROM users WHERE username = $1 AND id != $2',
        [username, userId]
      );

      if (usernameExists.rows.length > 0) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      }
    }

    const result = await pool.query(
      `UPDATE users
       SET
         username = COALESCE($1, username),
         avatar_url = COALESCE($2, avatar_url),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, username, email, avatar_url, created_at, updated_at`,
      [username || null, avatar_url || null, userId]
    );

    return res.json({
      message: 'Perfil actualizado',
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, username, avatar_url, created_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};