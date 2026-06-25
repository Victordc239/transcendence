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

    </div>
  );
}