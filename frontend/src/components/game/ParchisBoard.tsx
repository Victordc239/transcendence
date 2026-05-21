import { mainTrack, CENTER } from "../../game/boardPositions";

export default function ParchisBoard() {
  return (
    <svg
      width={1550}
      height={1550}
      viewBox="0 0 600 600"
      className="rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl"
    >
      {/* fondo tablero */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={260}
        fill="rgba(255,255,255,0.04)"
      />

      {/* track */}
      {mainTrack.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={6}
          fill="rgba(255,255,255,0.15)"
        />
      ))}

      {/* centro */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={18}
        fill="rgba(255,255,255,0.3)"
      />
    </svg>
  );
}