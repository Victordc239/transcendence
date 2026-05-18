const pool = require('../db');

/* =============================
   GET GAME
============================= */

async function getGame(gameId) {

  const result = await pool.query(
    `
    SELECT state
    FROM games
    WHERE id = $1
    `,
    [gameId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].state;
}

/* =============================
   CREATE GAME
============================= */

async function createGame(game) {

  await pool.query(
    `
    INSERT INTO games (
      id,
      host_id,
      state,
      status
    )
    VALUES ($1, $2, $3, $4)
    `,
    [
      game.id,
      game.players[0].id,
      JSON.stringify(game),
      game.status
    ]
  );
}

/* =============================
   SAVE GAME
============================= */

async function saveGame(game) {

  await pool.query(
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
}

module.exports = {
  getGame,
  createGame,
  saveGame
};