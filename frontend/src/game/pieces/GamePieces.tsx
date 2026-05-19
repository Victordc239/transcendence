/*import { mainTrack, bases } from "../boardPositions";

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
}*/

/*import { resolvePiecePosition } from "../board/resolvePosition";

export default function GamePieces({ game }: any) {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {game.players.map((player: any) =>
        player.pieces.map((piece: any, i: number) => {
          const pos = resolvePiecePosition(piece, player);

          return (
            <g key={`${player.id}-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill={player.color}
                opacity={0.25}
              />

              <circle
                cx={pos.x}
                cy={pos.y}
                r={8}
                fill={player.color}
                style={{
                  filter: "drop-shadow(0 0 10px currentColor)",
                  transition: "all 0.25s ease",
                }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}*/

import { bases, mainTrack, CENTER } from "../board/boardLayout";

export default function GamePieces({ game }: any) {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {game.players?.map((player: any) =>
        player.pieces?.map((piece: any, i: number) => {
          
          let pos;

          // 🔥 BASE STATE
          if (piece.position === "base") {
            pos = bases[player.color]?.[i];
          }

          // 🔥 TRACK STATE (VALIDACIÓN FUERTE)
          else if (typeof piece.position === "number") {
            pos = mainTrack[piece.position];

            // 🚨 safety fallback
            if (!pos) pos = CENTER;
          }

          // 🔥 HOME / FINISH / ERROR STATE
          else {
            pos = CENTER;
          }

          // 🚨 HARD GUARD (evita crash total)
          if (!pos) return null;

          return (
            <g key={`${player.id}-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill={player.color}
                opacity={0.25}
              />

              <circle
                cx={pos.x}
                cy={pos.y}
                r={8}
                fill={player.color}
                style={{
                  filter: "drop-shadow(0 0 10px currentColor)",
                }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}
