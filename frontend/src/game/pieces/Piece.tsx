/*export default function Piece({ x, y, color }: any) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={0.02}
        fill={color}
        className="glow"
      />
      <circle
        cx={x}
        cy={y}
        r={0.03}
        fill="transparent"
        stroke={color}
        opacity={0.5}
      />
    </g>
  );
}*/

import { motion } from "framer-motion";

const glowClass: Record<string, string> = {
  pink: "neon-pink",
  blue: "neon-blue",
  green: "neon-green",
  purple: "neon-purple",
};

export default function Piece({
  x,
  y,
  color,
}: any) {
  return (
    <motion.img
      src={`/pieces/${color}-piece.png`}
      className={`
        absolute
        w-[42px]
        h-[42px]
        -translate-x-1/2
        -translate-y-1/2
        pointer-events-auto
        ${glowClass[color]}
      `}
      animate={{
        left: x,
        top: y,
      }}
      transition={{
        type: "spring",
        damping: 14,
        stiffness: 120,
      }}
      whileHover={{
        scale: 1.08,
      }}
    />
  );
}