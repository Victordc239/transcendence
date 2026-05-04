const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',       // ⚠️ cambia a 'db' si usas Docker para backend
  user: 'user',
  password: 'password',
  database: 'transcendence',
  port: 5432,
});

module.exports = pool;