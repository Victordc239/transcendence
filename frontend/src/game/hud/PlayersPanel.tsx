export default function PlayersPanel({ game }: any) {
  return (
    <div className="
      rounded-3xl
      p-4
      flex
      flex-col
      gap-3
    ">
      <h3 className="font-bold mb-2">Players</h3>

      {game.players.map((p: any) => {
        const isTurn = game.turn === p.id;

        return (
          <div
            key={p.id}
            className={`
              rounded-2xl
              p-3
              flex
              items-center
              gap-3
              border

              ${isTurn
                ? "border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,.3)]"
                : "border-white/5"
              }
            `}
          >
            <div
              className="
                w-14 h-14
                rounded-full
                bg-slate-700
                border-2 border-white/10
              "
            />

            <div className="flex-1">
              <div className="font-semibold capitalize">
                {p.color}
              </div>

              <div className="text-xs text-white/50">
                {p.abandoned
                  ? "Abandoned"
                  : p.connected
                  ? "Connected"
                  : "Disconnected"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}