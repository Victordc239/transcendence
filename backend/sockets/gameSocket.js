const {
  getGame,
  saveGame,
  deleteGame
} = require('../game/gameManager');

const setPlayerConnection = require(
  '../game/rules/setPlayerConnection'
);

const checkPausedState = require(
  '../game/rules/checkPausedState'
);

const isGameAbandoned = require(
  '../game/rules/isGameAbandoned'
);

const {
  DISCONNECT_TIMEOUT
} = require('../game/constants');

function registerGameSocket(io, socket) {

  /* -----------------------------
    JOIN GAME ROOM
  ------------------------------ */

  socket.on("game:join", async ({ gameId }) => {

    const game = await getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    const player = game.players.find(
      p => p.id === socket.user.id
    );

    if (!player) {
      return socket.emit("error", {
        message: "You are not part of this game"
      });
    }

    setPlayerConnection(
      game,
      socket.user.id,
      true
    );

    checkPausedState(game);

    await saveGame(game);

    socket.join(gameId);

    socket.emit("game:update", game);

    io.to(gameId).emit(
      "game:player_reconnected",
      {
        userId: socket.user.id
      }
    );
  });

  /* -----------------------------
    GET GAME STATE
  ------------------------------ */

  socket.on("game:state", async ({ gameId }) => {

    const game = await getGame(gameId);

    if (!game) {
      return socket.emit("error", {
        message: "Game not found"
      });
    }

    socket.emit("game:update", game);
  });

  /* -----------------------------
    DISCONNECT
  ------------------------------ */

  socket.on("disconnect", async () => {

    try {

      const joinedGames =
        Array.from(socket.rooms)
          .filter(room => room !== socket.id);

      for (const gameId of joinedGames) {

        const game = await getGame(gameId);

        if (!game) {
          continue;
        }

        setPlayerConnection(
          game,
          socket.user.id,
          false
        );

        checkPausedState(game);

        await saveGame(game);

        io.to(gameId).emit(
          "game:update",
          game
        );

        io.to(gameId).emit(
          "game:player_disconnected",
          {
            userId: socket.user.id
          }
        );

        setTimeout(async () => {

          const updatedGame =
            await getGame(gameId);

          if (!updatedGame) {
            return;
          }

          const player =
            updatedGame.players.find(
              p => p.id === socket.user.id
            );

          if (!player) {
            return;
          }

          /*
            Se reconectó
          */

          if (player.connected) {
            return;
          }

          /*
            Abandono definitivo
          */

          player.abandoned = true;

          const abandoned =
            isGameAbandoned(updatedGame);

          if (abandoned) {

            await deleteGame(gameId);

            return;
          }

          await saveGame(updatedGame);

          io.to(gameId).emit(
            "game:player_abandoned",
            {
              userId: socket.user.id
            }
          );

          io.to(gameId).emit(
            "game:update",
            updatedGame
          );

        }, DISCONNECT_TIMEOUT);
      }

    } catch (err) {

      console.error(err);
    }
  });
}

module.exports = registerGameSocket;