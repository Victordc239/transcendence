
import type { Game } from "../../store/gameStore";

export function isMyTurn(game: Game, myId: number) {
	return game.turn === myId;
}

export function getPlayer(game: Game, myId: number) {
	return game.players.find(p => p.id === myId);
}

export function canInteract(game: Game, myId: number) {
	return game.turn === myId && game.status === "playing";
}