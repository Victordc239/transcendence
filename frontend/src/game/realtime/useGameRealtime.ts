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