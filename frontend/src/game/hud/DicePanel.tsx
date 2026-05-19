export default function DicePanel({ value, onRoll }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="text-white text-sm mb-2">Dice</div>

      <div className="text-4xl font-bold text-cyan-300 mb-3">
        {value ?? "-"}
      </div>

      <button
        onClick={onRoll}
        className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 transition"
      >
        Roll
      </button>
    </div>
  );
}