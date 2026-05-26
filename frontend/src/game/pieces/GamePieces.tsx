//import { mainTrack, bases } from "../boardPositions";
//import { resolvePiecePosition } from "../board/resolvePosition";
//import { bases, mainTrack, CENTER } from "../board/boardLayout";

import { bases, mainTrack, CENTER } from "../board/boardCoordinates";

export default function GamePieces({ game }: any) {
  return (
    <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
      {game.players?.map((player: any) =>
        player.pieces?.map((piece: any, i: number) => {
          let pos: any = null;

          if (piece.state === "base") {
            pos = bases[player.color]?.[piece.id % 4];
          }

          if (piece.state === "track") {
            pos = mainTrack[piece.trackIndex % mainTrack.length];
          }

          /*
          if (piece.state === "base") {
            pos = bases[player.color]?.[i];
          }

          if (piece.state === "track") {
            pos = mainTrack[piece.trackIndex];
          }*/

          if (piece.state === "home") {
            pos = CENTER;
          }

          if (!pos) return null;

          return (
            <g key={`${player.id}-${i}`}>
              <circle cx={pos.x} cy={pos.y} r={18} fill={player.color} opacity={0.25} />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={10}
                fill={player.color}
                style={{ filter: "drop-shadow(0 0 12px currentColor)" }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}