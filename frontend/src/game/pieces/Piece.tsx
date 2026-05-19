export default function Piece({ x, y, color }: any) {
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
}