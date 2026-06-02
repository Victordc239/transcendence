import type { Game } from "../../types/game";
import { bases } from "../boardPositions";

const pieceImages: Record<string, string> = {
  pink: "/pieces/pink-piece.png",
  purple: "/pieces/purple-piece.png",
  blue: "/pieces/blue-piece.png",
  green: "/pieces/green-piece.png",
};

export default function GamePieces({
  game,
}: {
  game: Game;
}) {
  return (
    <svg
      viewBox="0 0 1600 1600"
      className="
        absolute
        inset-0
        w-full
        h-full
        z-30
        pointer-events-none
      "
      preserveAspectRatio="xMidYMid meet"
    >
      {game.players.map((player) =>
        player.pieces.map((piece, i) => {
          let pos = piece.coords;

          /**
           * Si backend todavía no envía coords
           * para fichas en base
           */
          if (!pos && piece.state === "base") {
            pos = bases[player.color][i];
          }

          if (!pos) {
            return null;
          }

          return (
            <g key={`${player.id}-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={42}
                fill={player.color}
                opacity={0.18}
              />

              <image
                href={pieceImages[player.color]}
                x={pos.x - 32}
                y={pos.y - 32}
                width={64}
                height={64}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter: `
                    drop-shadow(0 0 12px ${player.color})
                    drop-shadow(0 0 24px ${player.color})
                  `,
                }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}