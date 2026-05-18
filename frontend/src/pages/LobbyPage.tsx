import { useNavigate } from "react-router-dom";
import { createGame } from "../api/game.api";
import { useAuth } from "../context/AuthContext";

function LobbyPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCreateGame = async () => {
    if (!token) return;

    const game = await createGame(token);

    if (game?.id) {
      navigate(`/game/${game.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">

      {/* HEADER */}
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

      {/* HERO */}
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

export default LobbyPage;