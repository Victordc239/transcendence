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

/*import { motion } from "framer-motion";

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
}*/

export default function Piece({
  x,
  y,
  color,
}: any) {
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* OUTER GLOW */}
      <circle
        r={28}
        fill={color}
        opacity={0.18}
        style={{
          filter: `blur(10px)`,
        }}
      />

      {/* MAIN BODY */}
      <circle
        r={18}
        fill={color}
        style={{
          filter: `drop-shadow(0 0 18px ${color})`,
        }}
      />

      {/* INNER LIGHT */}
      <circle
        cy={-5}
        r={7}
        fill="rgba(255,255,255,.65)"
      />
    </g>
  );
}
