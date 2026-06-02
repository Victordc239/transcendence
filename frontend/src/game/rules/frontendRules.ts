import type { Game } from "../../store/gameStore";

export function getCurrentPlayer(game: Game) {
  return game.players.find(p => p.id === game.turn);
}

export function isMyTurn(game: Game, userId: number) {
  return game.turn === userId;
}

export function getPlayerPieces(game: Game, userId: number) {
  const player = game.players.find(p => p.id === userId);
  return player?.pieces || [];
}

export function canMovePiece(
  game: Game,
  userId: number,
  pieceIndex: number
) {
  const player = game.players.find(p => p.id === userId);
  if (!player) return false;

  if (game.turn !== userId) return false;

  const piece = player.pieces[pieceIndex];
  if (!piece) return false;

  // reglas básicas frontend (no reemplaza backend)
  if (game.dice === null) return false;

  return true;
}
