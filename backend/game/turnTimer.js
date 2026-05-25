const {
  TURN_TIMEOUT,
  GAME_STATUS
} = require('./constants');

const nextTurn = require('./rules/nextTurn');

const {
  getGame,
  saveGame
} = require('./gameManager');

const {
  getIO
} = require('../socket');

/* =============================
   ACTIVE TIMERS
============================= */

const turnTimers = new Map();

/*
  turnTimers = Map {
    gameId => timeout
  }
*/

/* =============================
   CLEAR TURN TIMER
============================= */

function clearTurnTimer(gameId) {

  const existingTimer =
    turnTimers.get(gameId);

  if (existingTimer) {

    clearTimeout(existingTimer);

    turnTimers.delete(gameId);
  }
}

/* =============================
   START TURN TIMER
============================= */

function startTurnTimer(gameId)
{
	clearTurnTimer(gameId);

	const timeout = setTimeout( async () => {
		try {
			const game = await getGame(gameId);

			if (!game)
			{
				clearTurnTimer(gameId);
				return;
			}

			// Solo partidas activas 
			if (game.status !== GAME_STATUS.PLAYING)
			{
				return;
			}

			// Si el jugador ya tiró dado, cancelar dado actual
			game.dice = null;

			// Siguiente turno
			nextTurn(game);
			game.updatedAt = Date.now();
			await saveGame(game);

			//Reiniciar timer
			startTurnTimer(game.id);

			//Emitir update
			getIO()
				.to(game.id)
				.emit("game:turn_timeout", { nextTurn: game.turn});

			getIO()
				.to(game.id)
				.emit("game:update", game);

		}
		catch (err)
		{
			console.error(err);
		}

	}, TURN_TIMEOUT );

	turnTimers.set( gameId, timeout);
}

module.exports = {
  startTurnTimer,
  clearTurnTimer
};