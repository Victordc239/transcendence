/*export default function DicePanel({ value, onRoll }: any) {
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
}*/

/*export default function DicePanel({ game }: any) {
  return (
    <div className="p-3 rounded-xl bg-white/5 text-center">
      <div className="text-4xl">{game.dice ?? "🎲"}</div>
    </div>
  );
}*/

import { motion } from "framer-motion";

export default function DicePanel({ game }: any) {
  const dice = game.dice || 1;

  return (
    <div className="
      glass-panel
      rounded-3xl
      p-6
      flex
      flex-col
      items-center
      justify-center
      gap-4
    ">
      <motion.img
        key={dice}
        src={`/ui/dice-${dice}.svg`}
        className="w-28 h-28 object-contain"
        initial={{
          rotate: -180,
          scale: 0.4,
          opacity: 0
        }}
        animate={{
          rotate: 0,
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: .6,
          type: "spring"
        }}
      />

      <button
        className="
          px-5 py-3
          rounded-2xl
          bg-cyan-500/20
          border border-cyan-400/30
          hover:bg-cyan-500/30
          transition
        "
      >
      </button>
    </div>
  );
}
