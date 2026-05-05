const pool = require('../db');

exports.sendRequest = async (req, res) => {
  try {
    const requesterId = req.user.id;
    const addresseeId = parseInt(req.params.id, 10);

    if (Number.isNaN(addresseeId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    if (requesterId === addresseeId) {
      return res.status(400).json({ error: 'No puedes enviarte solicitud a ti mismo' });
    }

    const targetUser = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [addresseeId]
    );

    if (targetUser.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const existing = await pool.query(
      `SELECT * FROM friendships
       WHERE (requester_id = $1 AND addressee_id = $2)
          OR (requester_id = $2 AND addressee_id = $1)`,
      [requesterId, addresseeId]
    );

    if (existing.rows.length > 0) {
      const relation = existing.rows[0];

      if (relation.status === 'pending') {
        return res.status(400).json({ error: 'Ya existe una solicitud pendiente' });
      }

      if (relation.status === 'accepted') {
        return res.status(400).json({ error: 'Ya sois amigos' });
      }
    }

    const result = await pool.query(
      `INSERT INTO friendships (requester_id, addressee_id, status)
       VALUES ($1, $2, 'pending')
       RETURNING id, requester_id, addressee_id, status, created_at`,
      [requesterId, addresseeId]
    );

    return res.status(201).json({
      message: 'Solicitud enviada',
      request: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requesterId = parseInt(req.params.id, 10);

    if (Number.isNaN(requesterId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const request = await pool.query(
      `SELECT * FROM friendships
       WHERE requester_id = $1 AND addressee_id = $2 AND status = 'pending'`,
      [requesterId, userId]
    );

    if (request.rows.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const updated = await pool.query(
      `UPDATE friendships
       SET status = 'accepted', accepted_at = CURRENT_TIMESTAMP
       WHERE requester_id = $1 AND addressee_id = $2 AND status = 'pending'
       RETURNING id, requester_id, addressee_id, status, created_at, accepted_at`,
      [requesterId, userId]
    );

    return res.json({
      message: 'Solicitud aceptada',
      friendship: updated.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.deleteRelation = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = parseInt(req.params.id, 10);

    if (Number.isNaN(otherUserId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await pool.query(
      `DELETE FROM friendships
       WHERE (requester_id = $1 AND addressee_id = $2)
          OR (requester_id = $2 AND addressee_id = $1)
       RETURNING id`,
      [userId, otherUserId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    return res.json({ message: 'Relación eliminada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.username,
        u.email,
        u.avatar_url,
        f.accepted_at
      FROM friendships f
      JOIN users u
        ON (u.id = CASE
          WHEN f.requester_id = $1 THEN f.addressee_id
          ELSE f.requester_id
        END)
      WHERE (f.requester_id = $1 OR f.addressee_id = $1)
        AND f.status = 'accepted'
      ORDER BY f.accepted_at DESC
      `,
      [userId]
    );

    return res.json({ friends: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        f.id,
        u.id AS requester_id,
        u.username,
        u.email,
        u.avatar_url,
        f.created_at
      FROM friendships f
      JOIN users u ON u.id = f.requester_id
      WHERE f.addressee_id = $1
        AND f.status = 'pending'
      ORDER BY f.created_at DESC
      `,
      [userId]
    );

    return res.json({ requests: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};