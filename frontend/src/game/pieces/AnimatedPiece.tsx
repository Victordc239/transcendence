import Piece from "./Piece";
import { useAnimatedPiece } from "../hooks/useAnimatedPiece";

export default function AnimatedPiece({
  piece,
  player,
}: any) {
  const pos = useAnimatedPiece({
    piece,
    player,
  });

  return (
    <svg className="absolute inset-0 w-full h-full overflow-visible">
      <Piece
        x={pos.x}
        y={pos.y}
        color={player.color}
      />
    </svg>
  );
}