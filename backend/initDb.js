const pool = require('./db');

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar_url TEXT DEFAULT '/uploads/default-avatar.png',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS friendships (
        id SERIAL PRIMARY KEY,
        requester_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        addressee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        accepted_at TIMESTAMP NULL,
        CHECK (requester_id <> addressee_id),
        UNIQUE (requester_id, addressee_id)
      );
    `);

    console.log('✅ Tablas users y friendships listas');
  } catch (err) {
    console.error('❌ Error creando tablas:', err);
    throw err;
  }
}

module.exports = initDB;