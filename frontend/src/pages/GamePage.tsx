/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket, connectSocket } from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece } from "../api/game.api";

import ParchisBoard from "../components/game/ParchisBoard";
import GamePieces from "../game/pieces/GamePieces";

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

  const [rolling, setRolling] = useState(false);

  const handleRoll = async () => {
    if (!token || !id) return;

    try {
      setRolling(true);

      await rollDice(token, id);

    } catch (err) {
      console.error(err);

    } finally {
      setTimeout(() => {
        setRolling(false);
      }, 600);
    }
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

        <div
          className={`
            mt-4 w-24 h-24 rounded-3xl
            flex items-center justify-center
            bg-white/10 backdrop-blur-xl
            text-4xl font-bold
            transition-all duration-300
            ${rolling ? "scale-110 rotate-12" : ""}
          `}
        >
          {game.dice ?? "🎲"}
        </div>

        <div className="mt-10 relative w-[600px] h-[600px] mx-auto">
          <ParchisBoard />
          <GamePieces game={game} />
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
}*/

/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket, connectSocket } from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece } from "../api/game.api";

import ParchisBoard from "../components/game/ParchisBoard";
import GamePieces from "../game/pieces/GamePieces";

export default function GamePage() {
  const { id } = useParams();
  const { token } = useAuth();

  const game = useGameStore((s) => s.game);
  const setGame = useGameStore((s) => s.setGame);

  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!token || !id) return;

    const init = async () => {
      await fetch(`http://localhost:3000/games/${id}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      connectSocket(token);

      socket.emit("game:join", { gameId: id });

      socket.on("game:update", (state) => {
        setGame(state);
      });

      socket.emit("game:state", { gameId: id });
    };

    init();

    return () => {
      socket.off("game:update");
    };
  }, [id, token]);

  const handleRoll = async () => {
    if (!token || !id) return;

    setRolling(true);

    try {
      await rollDice(token, id);
    } finally {
      setTimeout(() => setRolling(false), 500);
    }
  };

  const handleMove = async (index: number) => {
    if (!token || !id) return;
    await movePiece(token, id, index);
  };

  if (!game) {
    return <div className="text-white p-6">Loading game...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-[600px] h-[600px]">
          <ParchisBoard />
          <GamePieces game={game} />
        </div>
      </div>

      <div className="w-80 p-4 space-y-4 bg-black/20 backdrop-blur-xl">
        
        <h1 className="text-xl font-bold">
          Game {game.id}
        </h1>

        <div className="text-white/60">
          Turn: {game.turn}
        </div>

        <div
          className={`text-4xl p-4 rounded-xl bg-white/10 transition ${
            rolling ? "scale-110 rotate-12" : ""
          }`}
        >
          {game.dice ?? "🎲"}
        </div>

        <button
          onClick={handleRoll}
          className="w-full py-2 bg-purple-500 rounded-xl"
        >
          Roll Dice
        </button>

        <div className="space-y-3">
          {game.players.map((p: any) => (
            <div key={p.id} className="p-3 bg-white/5 rounded-xl">
              <div className="font-semibold">{p.color}</div>

              <div className="flex gap-2 mt-2">
                {p.pieces.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleMove(i)}
                    className="px-2 py-1 bg-white/10 rounded"
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
}*/

import { API_URL } from "../api/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket, connectSocket } from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece } from "../api/game.api";

import GameScene from "../game/layout/GameScene";

export default function GamePage() {
  const { id } = useParams();
  const { token } = useAuth();

  const game = useGameStore((s) => s.game);
  const setGame = useGameStore((s) => s.setGame);

  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!token || !id) return;

    const init = async () => {
      await fetch(`${API_URL}/games/${id}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      connectSocket(token);

      socket.emit("game:join", { gameId: id });

      socket.on("game:update", (state) => {
        setGame(state);
      });

      socket.emit("game:state", { gameId: id });
    };

    init();

    return () => {
      socket.off("game:update");
    };
  }, [id, token]);

  const handleRoll = async () => {
    if (!token || !id) return;

    setRolling(true);

    try {
      await rollDice(token, id);
    } finally {
      setTimeout(() => setRolling(false), 500);
    }
  };

  const handleMove = async (index: number) => {
    if (!token || !id) return;
    await movePiece(token, id, index);
  };

  if (!game) {
    return <div className="text-white p-6">Loading game...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      
      {/* LEFT: BOARD */}
      <div className="flex-1 flex items-center justify-center">
        <GameScene game={game} />
      </div>

      {/* RIGHT: HUD */}
      <div className="w-80 p-4 space-y-4 bg-black/20 backdrop-blur-xl">
        
        <h1 className="text-xl font-bold">
          Game {game.id}
        </h1>

        <div className="text-white/60">
          Turn: {game.turn}
        </div>

        <div
          className={`text-4xl p-4 rounded-xl bg-white/10 transition ${
            rolling ? "scale-110 rotate-12" : ""
          }`}
        >
          {game.dice ?? "🎲"}
        </div>

        <button
          onClick={handleRoll}
          className="w-full py-2 bg-purple-500 rounded-xl"
        >
          Roll Dice
        </button>

        <div className="space-y-3">
          {game.players.map((p: any) => (
            <div key={p.id} className="p-3 bg-white/5 rounded-xl">
              <div className="font-semibold">{p.color}</div>

              <div className="flex gap-2 mt-2">
                {p.pieces.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleMove(i)}
                    className="px-2 py-1 bg-white/10 rounded"
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