import { useState } from "react";
import { useGameRealtime } from "../game/realtime/useGameRealtime";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece } from "../api/game.api";
import GameScene from "../game/layout/GameScene";

export default function GamePage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const game = useGameStore((s) => s.game);

  const [rolling, setRolling] = useState(false);

  useGameRealtime(id ?? "", token ?? "");

  const isSpectator = !!(
    game &&
    !game.players.some((p: any) => p.id === user?.id)
  );

  const handleRoll = async () => {
    if (!token || !id || isSpectator) return;

    setRolling(true);

    try {
      await rollDice(token, id);
    } finally {
      setTimeout(() => setRolling(false), 500);
    }
  };

  const handleMove = async (index: number) => {
    if (!token || !id || isSpectator) return;
    await movePiece(token, id, index);
  };

  if (!game) {
    return <div className="text-white p-6">Loading game...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <div className="flex-1 flex items-center justify-center relative">
        {isSpectator && (
          <div className="absolute top-4 left-4 z-50 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-xl">
            👁 Spectator Mode
          </div>
        )}

        <GameScene
          game={game}
          onPieceClick={(playerId: number, pieceIndex: number) => {
            if (isSpectator) return;

            const currentPlayer = game.players.find(
              (p: any) => p.id === game.turn
            );

            if (!currentPlayer) return;
            if (currentPlayer.id !== playerId) return;

            handleMove(pieceIndex);
          }}
        />
      </div>

      <div className="w-80 p-4 space-y-4 bg-black/20 backdrop-blur-xl">
        <h1 className="text-xl font-bold">
          Game {game.id}
        </h1>

        <div className="text-white/60">
          Turn: {game.turn}
        </div>

        <div className="text-white/60">
          Spectators: {game.spectators?.length || 0}
        </div>

        <div
          className={`text-4xl p-4 rounded-xl bg-white/10 transition ${
            rolling ? "scale-110 rotate-12" : ""
          }`}
        >
          {game.dice ?? "🎲"}
        </div>

        <button
          disabled={isSpectator}
          onClick={handleRoll}
          className={`w-full py-2 rounded-xl ${
            isSpectator
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500"
          }`}
        >
          {isSpectator ? "Spectating" : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}