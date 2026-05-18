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

  if (!game) return <div>Loading game...</div>;

  return (
    <div className="p-6 text-white">
      <h1>Game {game.id}</h1>

      <p>Turn: {game.turn}</p>
      <p>Dice: {game.dice}</p>

      <button onClick={handleRoll}>Roll Dice</button>

      <div className="mt-6">
        {game.players.map((p) => (
          <div key={p.id}>
            <p>{p.color}</p>

            {p.pieces.map((_, i) => (
              <button
                key={i}
                onClick={() => handleMove(i)}
                className="m-1 px-2 py-1 bg-white/10"
              >
                Move {i}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}