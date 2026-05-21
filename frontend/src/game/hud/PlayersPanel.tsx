/*export default function PlayersPanel({ players, currentTurn }: any) {
  return (
    <div className="space-y-3">
      {players.map((p: any) => (
        <div
          key={p.id}
          className={`p-3 rounded-xl border ${
            currentTurn === p.id
              ? "border-cyan-400 bg-cyan-400/10"
              : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-white">{p.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}*/

/*export default function PlayersPanel({ game }: any) {
  return (
    <div className="p-3 rounded-xl bg-white/5">
      <h3 className="font-bold mb-2">Players</h3>

      {game.players.map((p: any) => (
        <div key={p.id} className="flex justify-between text-sm py-1">
          <span>{p.color}</span>
          <span>{game.turn === p.id ? "🎯 TURN" : ""}</span>
        </div>
      ))}
    </div>
  );
}*/

export default function PlayersPanel({ game }: any) {
  return (
    <div className="
      glass-panel
      rounded-3xl
      p-4
      flex
      flex-col
      gap-3
    ">
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
                {isTurn ? "Your Turn" : "Waiting"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}