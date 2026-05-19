export type PlayerColor =
  | "pink"
  | "purple"
  | "green"
  | "blue";

export interface Piece {
  id: number;
  position: number;
  isHome: boolean;
  isFinished: boolean;
}

export interface Player {
  id: number;
  username: string;
  color: PlayerColor;
  pieces: Piece[];
}

export interface Game {
  id: string;

  players: Player[];

  currentTurn: number;

  diceValue: number | null;

  status:
    | "waiting"
    | "playing"
    | "finished";
}