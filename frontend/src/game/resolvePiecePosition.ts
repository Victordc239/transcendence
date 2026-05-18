import { mainTrack, bases } from "./boardEngine";
import type { Piece, Player } from "../store/gameStore";

export function resolvePiecePosition(
  piece: Piece,
  player: Player
) {
  if (piece.state === "base") {
    return bases[player.color][piece.trackIndex];
  }

  if (piece.state === "track") {
    return mainTrack[piece.trackIndex];
  }

  if (piece.state === "home") {
    // TODO: home lane positions
    return mainTrack[piece.trackIndex];
  }

  // finished → centro
  return { x: 300, y: 300 };
}