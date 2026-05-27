//import { mainTrack, bases } from "../boardPositions";
//import { bases, mainTrack, CENTER } from "../board/boardCoordinates";
//import AnimatedPiece from "./AnimatedPiece";

/*import {
  bases,
  mainTrack,
  CENTER,
} from "../board/boardCoordinates";

type Props = {
  game: any;
};

const PIECE_IMAGES: Record<string, string> = {
  pink: "/pieces/pink-piece.png",
  purple: "/pieces/purple-piece.png",
  blue: "/pieces/blue-piece.png",
  green: "/pieces/green-piece.png",
};

export default function GamePieces({
  game,
}: Props) {
  return (
    <svg
      viewBox="0 0 1600 1600"
      className="
        absolute
        inset-0
        w-full
        h-full
        z-20
        pointer-events-none
      "
      preserveAspectRatio="xMidYMid meet"
    >
      {game.players?.map((player: any) =>
        player.pieces?.map((piece: any, i: number) => {

          let pos: any = null;

          if (piece.state === "base") {
            pos = bases[player.color]?.[i];
          }

          else if (piece.state === "track") {
            pos = mainTrack[piece.trackIndex];
          }

          else if (piece.state === "home") {
            pos = CENTER;
          }

          else if (piece.state === "finished") {
            pos = CENTER;
          }

          if (!pos) return null;

          const image = PIECE_IMAGES[player.color];

          return (
            <g
              key={`${player.id}-${piece.id}-${i}`}
            >

              <circle
                cx={pos.x}
                cy={pos.y}
                r={42}
                fill={player.color}
                opacity={0.18}
                style={{
                  filter:
                    "blur(12px)",
                }}
              />

              <circle
                cx={pos.x}
                cy={pos.y}
                r={30}
                fill={player.color}
                opacity={0.22}
              />

              <image
                href={image}
                x={pos.x - 32}
                y={pos.y - 32}
                width={64}
                height={64}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter:
                    "drop-shadow(0 0 14px rgba(255,255,255,.18))",
                }}
              />

            </g>
          );
        })
      )}
    </svg>
  );
}*/

import { bases, mainTrack, CENTER } from "../board/boardCoordinates";

const pieceImages: Record<string, string> = {
  pink: "/pieces/pink-piece.png",
  purple: "/pieces/purple-piece.png",
  blue: "/pieces/blue-piece.png",
  green: "/pieces/green-piece.png",
};

export default function GamePieces({ game }: any) {
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
      {game.players?.map((player: any) =>
        player.pieces?.map((piece: any, i: number) => {
          let pos: any = null;

          /* =========================
             BASE
          ========================= */

          if (piece.state === "base") {
            pos = bases[player.color]?.[i];
          }

          /* =========================
             TRACK
          ========================= */

          if (piece.state === "track") {
            pos = mainTrack[piece.trackIndex];
          }

          /* =========================
             HOME
          ========================= */

          if (piece.state === "home") {
            pos = CENTER;
          }

          if (!pos) return null;

          return (
            <g
              key={`${player.id}-${i}`}
            >
              {/* GLOW */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={42}
                fill={player.color}
                opacity={0.18}
              />

              {/* PIECE IMAGE */}
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
