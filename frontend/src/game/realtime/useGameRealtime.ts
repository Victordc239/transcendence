/*import { useEffect } from "react";

import { socket } from "../../socket/socket";

import { useGameStore }
  from "../../store/gameStore";

export function useGameRealtime(
  gameId: string,
  token: string
) {
  const setGame =
    useGameStore(
      (s) => s.setGame
    );

  useEffect(() => {
    socket.auth = { token };

    if (!socket.connected)
    {
      socket.connect();
    }

    socket.emit(
      "game:join",
      {
        gameId,
      }
    );

    socket.emit(
      "game:state",
      {
        gameId,
      }
    );

    const onUpdate =
      (game: any) => {
        setGame(game);
      };

    socket.on(
      "game:update",
      onUpdate
    );

    return () => {
      socket.off(
        "game:update",
        onUpdate
      );
    };
  }, [
    gameId,
    token,
    setGame,
  ]);
}*/

/*import { useEffect } from "react";
import { socket } from "../../socket/socket";
import { useGameStore } from "../../store/gameStore";
import { connectSocket } from "../../socket/socket";

export function useGameRealtime(gameId: string, token: string) {
  const setGame = useGameStore((s) => s.setGame);
  const clearGame = useGameStore((s) => s.clear);

  useEffect(() => {
    if (!gameId || !token) return;

    // 1. conectar socket UNA vez
    connectSocket(token);

    // 2. limpiar estado previo (evita desync entre partidas)
    clearGame();

    // 3. join room
    socket.emit("game:join", { gameId });

    // 4. pedir estado inicial (fallback)
    socket.emit("game:state", { gameId });

    const onUpdate = (game: any) => {
      setGame(game);
    };

    socket.on("game:update", onUpdate);

    return () => {
      socket.off("game:update", onUpdate);
      socket.emit("game:leave", { gameId });
    };
  }, [gameId, token, setGame, clearGame]);
}*/

import { useEffect, useRef } from "react";
import { socket, connectSocket } from "../../socket/socket";
import { useGameStore } from "../../store/gameStore";

export function useGameRealtime(
  gameId: string,
  token: string
) {
  const setGame = useGameStore(
    (s) => s.setGame
  );

  const clearGame = useGameStore(
    (s) => s.clear
  );

  const joinedRef = useRef<string | null>(
    null
  );

  useEffect(() => {
    if (!gameId || !token) {
      return;
    }

    connectSocket(token);

    clearGame();

    const onUpdate = (game: any) => {
      setGame(game);
    };

    socket.off("game:update", onUpdate);
    socket.on("game:update", onUpdate);

    if (joinedRef.current !== gameId) {
      joinedRef.current = gameId;

      socket.emit("game:join", {
        gameId,
      });

      socket.emit("game:state", {
        gameId,
      });
    }

    return () => {
      socket.off(
        "game:update",
        onUpdate
      );
    };
  }, [
    gameId,
    token,
    setGame,
    clearGame,
  ]);
}