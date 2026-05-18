export type PlayerColor =
  | "red"
  | "blue"
  | "green"
  | "yellow";

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