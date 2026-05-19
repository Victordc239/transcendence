import { mainTrack, bases, CENTER } from "./boardLayout";

export function resolvePiecePosition(piece: any, player: any) {
  if (piece.position === "base") {
    return bases[player.color][piece.index % 4];
  }

  if (piece.position === "track") {
    return mainTrack[piece.trackIndex % mainTrack.length];
  }

  if (piece.position === "home") {
    return CENTER;
  }

  return CENTER;
}