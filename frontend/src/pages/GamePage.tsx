import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket, connectSocket } from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece } from "../api/game.api";

export default function GamePage() {
  const { id } = useParams();
  const { token } = useAuth();
  const game = useGameStore((s) => s.game);
  const setGame = useGameStore((s) => s.setGame);

  useEffect(() => {
    if (!token || !id) return;

    const init = async () => {
      try {
        // 1. unir partida por HTTP (CRÍTICO)
        await fetch(`http://localhost:3000/games/${id}/join`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 2. conectar socket
        connectSocket(token);

        socket.emit("game:join", { gameId: id });

        socket.on("game:update", (state) => {
          setGame(state);
        });

        // opcional: pedir estado inicial explícito
        socket.emit("game:state", { gameId: id });

      } catch (err) {
        console.error("Error joining game:", err);
      }
    };

    init();

    return () => {
      socket.off("game:update");
    };
  }, [id, token]);

  const handleRoll = async () => {
    if (!token || !id) return;
    await rollDice(token, id);
  };

  const handleMove = async (index: number) => {
    if (!token || !id) return;
    await movePiece(token, id, index);
  };

  if (!game) {
    return (
      <div className="p-6 text-white">
        Loading game...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold">
          Game {game.id}
        </h1>

        <div className="mt-2 text-white/70">
          Turn: {game.turn}
        </div>

        <div className="mt-2 text-white/70">
          Dice: {game.dice ?? "-"}
        </div>

        <button
          onClick={handleRoll}
          className="mt-4 px-4 py-2 bg-purple-500 rounded-xl"
        >
          Roll Dice
        </button>

        <div className="mt-8 space-y-6">
          {game.players.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-white/5"
            >
              <p className="font-semibold text-lg">
                {p.color}
              </p>

              <div className="flex gap-2 mt-2">
                {p.pieces.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleMove(i)}
                    className="px-3 py-1 bg-white/10 rounded-lg"
                  >
                    Move {i}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
