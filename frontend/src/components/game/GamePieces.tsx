import { mainTrack, bases } from "../../game/boardPositions";

export default function GamePieces({ game }: any) {
  return (
    <svg className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none">

      {game.players.map((player: any) =>
        player.pieces.map((piece: any, i: number) => {
          let pos;

          if (piece.position === "base") {
            pos = bases[player.color][i];
          } else {
            pos = mainTrack[piece.position as number];
          }

          return (
            <circle
              key={`${player.id}-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={10}
              fill={player.color}
              opacity={0.9}
              style={{
                filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))",
                transition: "all 0.3s ease",
              }}
            />
          );
        })
      )}
    </svg>
  );
}