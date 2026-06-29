/*import { useNavigate } from "react-router-dom";
import { createGame } from "../api/game.api";
import { useAuth } from "../context/AuthContext";

function LobbyPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

const handleCreateGame = async () => {
  try {
    if (!token) {
      console.warn("No token - usuario no autenticado");
      return;
    }

    const game = await createGame(token);

    console.log("GAME CREATED:", game);

    if (game?.id) {
      navigate(`/game/${game.id}`);
    }
  } catch (err) {
    console.error("CREATE GAME ERROR:", err);
    alert("Error creando partida");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            Parchís Online
          </h1>
          <p className="text-white/60 text-sm mt-2">
            Lobby social competitivo
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500/10 px-4 py-2 text-red-200 hover:bg-red-500/20"
        >
          Logout
        </button>
      </div>

      <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h2 className="text-5xl font-bold">
          Bienvenida al Parchís Online
        </h2>

        <p className="mt-4 text-white/70 max-w-2xl">
          Sistema multiplayer con sockets, matchmaking y partidas en tiempo real.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleCreateGame}
            className="rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 font-semibold"
          >
            Crear partida
          </button>

          <button
            className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3"
          >
            Unirse a partida
          </button>
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, joinGame } from "../api/game.api";
import { useAuth } from "../context/AuthContext";
import LobbyChat from "../components/ui/LobbyChat";

function LobbyPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [gameId, setGameId] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleCreateGame = async () => {
    try {
      if (!token) return;

      setLoadingCreate(true);

      const game = await createGame(token);

      if (game?.id) {
        navigate(`/game/${game.id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error creando partida");
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleJoinGame = async () => {
    try {
      if (!token) return;

      if (!gameId.trim()) {
        alert("Introduce un ID de partida");
        return;
      }

      setLoadingJoin(true);

      const game = await joinGame(token, gameId.trim());

      if (game?.id) {
        navigate(`/game/${game.id}`);
      }
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? err.message
          : "Error uniéndose a la partida"
      );
    } finally {
      setLoadingJoin(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            Parchís Online
          </h1>

          <p className="text-white/60 text-sm mt-2">
            Lobby social competitivo
          </p>
        </div>

        <div className="flex gap-6 items-center">
          <button onClick={() => navigate("/profile")}>
            Perfil
          </button>

          <button onClick={() => navigate("/friends")}>
            Amigos
          </button>

          <button onClick={() => navigate("/friend-requests")}>
            Solicitudes
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500/10 px-4 py-2 text-red-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <h2 className="text-5xl font-bold">
          Bienvenida al Parchís Online
        </h2>

        <p className="mt-4 text-white/70 max-w-2xl">
          Sistema multiplayer con sockets, matchmaking y partidas en tiempo real.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={handleCreateGame}
            disabled={loadingCreate}
            className="rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 font-semibold disabled:opacity-50"
          >
            {loadingCreate ? "Creando..." : "Crear partida"}
          </button>

          <div className="flex gap-3">
            <input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="ID de partida"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40"
            />

            <button
              onClick={handleJoinGame}
              disabled={loadingJoin}
              className="rounded-xl border border-white/10 bg-white/10 px-6 py-2 disabled:opacity-50"
            >
              {loadingJoin ? "Uniéndose..." : "Unirse"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <LobbyChat />
      </div>
    </div>
  );
}

export default LobbyPage;