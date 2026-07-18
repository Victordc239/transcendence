import { useState } from "react";
import { useGameRealtime } from "../game/realtime/useGameRealtime";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGameStore } from "../store/gameStore";
import { rollDice, movePiece, moveBonusPiece } from "../api/game.api";
import GameScene from "../game/layout/GameScene";
import Footer from "../components/ui/Footer";
import PlayersPanel from "../game/hud/PlayersPanel";
import ChatPanel from "../game/hud/ChatPanel";
import GameHUD from "../game/hud/GameHUD";
import { socket } from "../socket/socket";

export default function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();
  const game = useGameStore((s) => s.game);
  const showLastPlayerPopup = useGameStore((s) => s.showLastPlayerPopup);
  const setShowLastPlayerPopup = useGameStore((s) => s.setShowLastPlayerPopup);

  const [rolling, setRolling] = useState(false);

  useGameRealtime(id ?? "", token ?? "");

  const isSpectator = !!(
    game && !game.players.some((p: any) => p.id === user?.id)
  );

  const handleRoll = async () => {
    if (!token || !id || isSpectator)
      return;

    setRolling(true);

    try
    {
      const result = await rollDice(token, id);

      if (!result.success)
      {
        alert(result.error);
        return;
      }
    }
    finally
    {
      setTimeout(() => setRolling(false), 500);
    }
  };

  const handleMove = async (index: number) => {
    if (!token || !id || isSpectator || !game)
      return;

    try
    {
      if (game.pendingBonus != null)
        await moveBonusPiece(token, id, index);
      else
        await movePiece(token, id, index);
    }
    catch (err)
    {
        if (!(err instanceof Error))
        {
            console.error(err);
            return;
        }

        if (err.message === "Roll dice first" || err.message === "Not your turn" || err.message === "Invalid move")
            return;

        console.error(err);
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

    if (id) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Botón Flotante para Móvil del HUD (Chat/Dados/Players) */}
      <div className="block md:hidden">
        <GameHUD game={game} />
      </div>

      {/* Contenedor Principal */}
      <div className="flex flex-1 flex-col md:flex-row p-4 md:p-6 gap-6 items-stretch">
        
        {/* LADO IZQUIERDO: El Escenario del Juego */}
        <div className="flex-1 flex items-center justify-center relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 p-4 min-h-[65vh] md:min-h-0">
          
          <button
            onClick={handleLeave}
            className="
              absolute top-4 left-4 z-50
              rounded-2xl
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              px-4 py-2 text-sm md:text-base
              font-semibold
              text-white/90
              shadow-lg
              transition-all duration-200
              hover:bg-red-500/20
              hover:border-red-500/40
              hover:text-red-300
            "
          >
            Leave Game
          </button>

          {isSpectator && (
            <div className="absolute top-16 md:top-20 left-4 z-50 bg-yellow-500/20 text-yellow-300 px-3 py-1.5 rounded-xl text-xs font-semibold">
              👁 Spectator Mode
            </div>
          )}

          {showLastPlayerPopup && (
            <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-400">
                  Game abandoned
                </h2>
                <p className="text-white/70 mb-6 text-sm">
                  All other players have abandoned the game.
                </p>
                <button
                  onClick={handleLastPlayerConfirm}
                  className="w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-700 transition"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <GameScene
            game={game}
            onPieceClick={(playerId: number, pieceIndex: number) => {
              if (isSpectator) return;
              const currentPlayer = game.players.find(
                (p: any) => p.id === game.turn,
              );
              if (!currentPlayer) return;
              if (currentPlayer.id !== playerId) return;
              handleMove(pieceIndex);
            }}
          />
        </div>

        {/* LADO DERECHO: El Panel Lateral Organizado (Solo visible en PC) */}
        <div className="hidden md:flex w-80 flex-col gap-4">
          
          {/* Cabecera del juego */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <h1 className="text-lg font-bold text-purple-400">Game {game.id}</h1>
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <div>Turn: {game.turn}</div>
              <div>Spectators: {game.spectators?.length || 0}</div>
            </div>
          </div>

          {/* Tus componentes HUD directamente integrados en el flujo de la columna en PC */}
          <PlayersPanel game={game} />
          
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 flex flex-col gap-3">
            <div
              className={`text-3xl p-3 rounded-xl bg-white/5 border border-white/10 text-center transition ${
                rolling ? "scale-110 rotate-12" : ""
              }`}
            >
              {game.dice ?? "🎲"}
              {game.pendingBonus && (
                <span className="text-2xl font-bold text-yellow-400 animate-pulse ml-2">
                  +{game.pendingBonus}
                </span>
              )}
            </div>

            <button
              disabled={isSpectator || game.pendingBonus != null}
              onClick={handleRoll}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition ${
                isSpectator
                  ? "bg-gray-600/50 text-white/40 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:scale-95"
              }`}
            >
              {isSpectator ? "Spectating" : "Roll Dice"}
            </button>
          </div>

          <ChatPanel game={game} />
        </div>

      </div>

      <div className="px-6 py-2">
        <Footer />
      </div>
    </div>
  );
}
