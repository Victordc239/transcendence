import { useState } from "react";
import { useGameRealtime } from "../game/realtime/useGameRealtime";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece, moveBonusPiece } from "../api/game.api";
import GameScene from "../game/layout/GameScene";
import Footer from "../components/ui/Footer";
import { socket } from "../socket/socket";

export default function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();
  const game = useGameStore((s) => s.game);
  const showLastPlayerPopup = useGameStore(s => s.showLastPlayerPopup);
  const setShowLastPlayerPopup = useGameStore(s => s.setShowLastPlayerPopup);

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

    if (!token || !id || isSpectator || !game)
      return;

    if (game.pendingBonus != null) {
      await moveBonusPiece(
        token,
        id,
        index
      );
    } else {
      await movePiece(
        token,
        id,
        index
      );
    }
  };

  const handleLeave = () => {
    if (id) {
      socket.emit("game:leave", {
        gameId: id,
      });
    }
    navigate("/lobby");
  };

  const handleLastPlayerConfirm = () => {
    setShowLastPlayerPopup(false);

    if (id)
    {
      socket.emit("game:leave", {
        gameId: id,
      });
    }

    navigate("/lobby");
  };

  if (!game) {
    return <div className="text-white p-6">Loading game...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <div className="flex flex-1">

        <div className="flex-1 flex items-center justify-center relative">

          <button
            onClick={handleLeave}
            className="
              absolute top-4 left-4 z-50
              flex items-center gap-2
              rounded-2xl
              border border-red-400/30
              bg-red-500/10
              backdrop-blur-xl
              px-5 py-2.5
              font-semibold
              text-red-300
              shadow-lg
              transition-all duration-200
              hover:bg-red-500/20
              hover:border-red-400/50
              hover:text-red-200
              hover:scale-105
              active:scale-95
            "
          >
            Leave Game
          </button>

          {isSpectator && (
            <div className="absolute top-20 left-4 z-50 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-xl">
              👁 Spectator Mode
            </div>
          )}

          {
            showLastPlayerPopup && (
              <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center">

                <div className="bg-slate-900 rounded-xl p-8 max-w-md shadow-xl">

                  <h2 className="text-2xl font-bold mb-4">
                    Game abandoned
                  </h2>

                  <p className="text-white/80 mb-6">
                    All other players have abandoned the game.
                  </p>

                  <button
                    onClick={handleLastPlayerConfirm}
                    className="w-full rounded-xl bg-purple-600 py-2 font-semibold hover:bg-purple-700"
                  >
                    OK
                  </button>

                </div>

              </div>
            )
          }

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
            {
                game.pendingBonus && (
                    <div className="text-3xl font-bold text-yellow-400 animate-pulse">
                        +{game.pendingBonus}
                    </div>
                )
            }
          </div>

          <button
            disabled={isSpectator || game.pendingBonus != null}
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

      <div className="px-6">
        <Footer />
      </div>

    </div>
  );
}