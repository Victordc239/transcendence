import { useNavigate } from "react-router-dom";

function LobbyPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        p-6
        text-white
      "
    >
      {/* HEADER */}
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          rounded-3xl
          border border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
        "
      >
        <div>
          <h1
            className="
              bg-gradient-to-r
              from-pink-300
              via-purple-300
              to-blue-300
              bg-clip-text
              text-4xl
              font-bold
              text-transparent
            "
          >
            Parchís Online
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Lobby social competitivo casual
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            rounded-2xl
            border border-red-400/20
            bg-red-500/10
            px-5 py-3
            text-sm
            font-medium
            text-red-200
            transition
            hover:bg-red-500/20
          "
        >
          Logout
        </button>
      </div>

      {/* HERO */}
      <div
        className="
          mx-auto
          mt-6
          max-w-7xl
          rounded-3xl
          border border-white/10
          bg-white/5
          p-10
          backdrop-blur-xl
        "
      >
        <div className="max-w-3xl">
          <div
            className="
              mb-4
              inline-flex
              rounded-full
              border border-pink-400/20
              bg-pink-400/10
              px-4 py-2
              text-sm
              text-pink-200
            "
          >
            ONLINE MULTIPLAYER
          </div>

          <h2 className="text-6xl font-bold leading-tight">
            Bienvenida al nuevo
            <span
              className="
                bg-gradient-to-r
                from-pink-300
                via-purple-300
                to-blue-300
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Parchís competitivo
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Sistema online, lobby social, amigos, partidas rápidas,
            matchmaking y estética moderna glassmorphism.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/game")}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-pink-400
                to-purple-400
                px-8 py-4
                font-semibold
                text-white
                shadow-[0_0_30px_rgba(236,72,153,0.35)]
                transition
                hover:scale-[1.02]
              "
            >
              Crear partida
            </button>

            <button
              className="
                rounded-2xl
                border border-white/10
                bg-white/10
                px-8 py-4
                font-semibold
                text-white
                backdrop-blur-xl
                transition
                hover:bg-white/20
              "
            >
              Unirse a partida
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          mx-auto
          mt-6
          grid
          max-w-7xl
          gap-6
          lg:grid-cols-3
        "
      >
        {/* STATS */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <h3 className="text-xl font-semibold">
            Ranking
          </h3>

          <div className="mt-6 space-y-4">
            <div
              className="
                rounded-2xl
                bg-white/5
                p-4
              "
            >
              <p className="text-sm text-white/60">
                Victorias
              </p>

              <p className="mt-2 text-4xl font-bold">
                24
              </p>
            </div>

            <div
              className="
                rounded-2xl
                bg-white/5
                p-4
              "
            >
              <p className="text-sm text-white/60">
                Winrate
              </p>

              <p className="mt-2 text-4xl font-bold">
                68%
              </p>
            </div>
          </div>
        </div>

        {/* FRIENDS */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <h3 className="text-xl font-semibold">
            Amigos online
          </h3>

          <div className="mt-6 space-y-3">
            {["Lucía", "Alex", "Nora"].map((friend) => (
              <div
                key={friend}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white/5
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      h-10 w-10
                      rounded-full
                      bg-gradient-to-br
                      from-pink-400
                      to-purple-400
                    "
                  />

                  <div>
                    <p className="font-medium">
                      {friend}
                    </p>

                    <p className="text-xs text-green-300">
                      Online
                    </p>
                  </div>
                </div>

                <button
                  className="
                    rounded-xl
                    bg-white/10
                    px-3 py-2
                    text-sm
                    transition
                    hover:bg-white/20
                  "
                >
                  Invitar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORY */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <h3 className="text-xl font-semibold">
            Últimas partidas
          </h3>

          <div className="mt-6 space-y-3">
            {[
              "Victoria vs Alex",
              "Derrota vs Nora",
              "Victoria vs Lucía",
            ].map((match) => (
              <div
                key={match}
                className="
                  rounded-2xl
                  bg-white/5
                  p-4
                "
              >
                {match}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;