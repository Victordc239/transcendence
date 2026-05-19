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

export default function PlayersPanel({ game }: any) {
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
}