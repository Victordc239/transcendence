/*import type { Game } from "../../types/game";
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
}*/

import type { Game } from "../../types/game";
import {
  bases,
  finishedPositions,
} from "../boardPositions";

const pieceImages: Record<string, string> = {
  pink: "/pieces/pink-piece.png",
  purple: "/pieces/purple-piece.png",
  blue: "/pieces/blue-piece.png",
  green: "/pieces/green-piece.png",
};

type PieceRenderData = {
  playerId: number;
  color: string;
  index: number;
  x: number;
  y: number;
};

const BARRIER_OFFSET = 28;

export default function GamePieces({
  game,
}: {
  game: Game;
}) {
  const piecesToRender: PieceRenderData[] = [];

  for (const player of game.players) {
    player.pieces.forEach((piece, i) => {
      let pos = piece.coords;

      if (!pos && piece.state === "base") {
        pos = bases[player.color][i];
      }

      if (!pos && piece.state === "finished") {
        pos = finishedPositions[player.color][i];
      }

      if (!pos) {
        return;
      }

      piecesToRender.push({
        playerId: player.id,
        color: player.color,
        index: i,
        x: pos.x,
        y: pos.y,
      });
    });
  }

  const groups = new Map<string, PieceRenderData[]>();

  for (const piece of piecesToRender) {
    const key = `${piece.color}-${Math.round(piece.x)}-${Math.round(piece.y)}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)!.push(piece);
  }

  const finalPieces: PieceRenderData[] = [];

  groups.forEach((group) => {
    if (group.length !== 2) {
      finalPieces.push(...group);
      return;
    }

    const { x, y } = group[0];

    const isVerticalTrack =
      (x > 600 && x < 1000) || // columna central
      (x < 450) ||            // columna izquierda
      (x > 1150);             // columna derecha

    if (isVerticalTrack) {
      finalPieces.push({
        ...group[0],
        x: group[0].x - BARRIER_OFFSET,
      });

      finalPieces.push({
        ...group[1],
        x: group[1].x + BARRIER_OFFSET,
      });
    } else {
      finalPieces.push({
        ...group[0],
        y: group[0].y - BARRIER_OFFSET,
      });

      finalPieces.push({
        ...group[1],
        y: group[1].y + BARRIER_OFFSET,
      });
    }
  });

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
      {finalPieces.map((piece) => (
        <g
          key={`${piece.playerId}-${piece.index}`}
          style={{
            transition:
              "transform 220ms ease-out",
          }}
        >
          <circle
            cx={piece.x}
            cy={piece.y}
            r={42}
            fill={piece.color}
            opacity={0.18}
          />

          <image
            href={pieceImages[piece.color]}
            x={piece.x - 32}
            y={piece.y - 32}
            width={64}
            height={64}
            preserveAspectRatio="xMidYMid meet"
            style={{
              transition:
                "x 220ms ease-out, y 220ms ease-out",
              filter: `
                drop-shadow(0 0 12px ${piece.color})
                drop-shadow(0 0 24px ${piece.color})
              `,
            }}
          />
        </g>
      ))}
    </svg>
  );
}