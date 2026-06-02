/*export type PlayerColor =
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
}*/

export type PieceState =
  | "base"
  | "track"
  | "final"
  | "finished";

export interface PieceCoords {
  x: number;
  y: number;
}

export interface Piece {
  id: string;

  state: PieceState;

  position: number;

  coords: PieceCoords | null;
}

export interface Player {
  id: number;

  color:
    | "pink"
    | "purple"
    | "green"
    | "blue";

  connected: boolean;

  abandoned: boolean;

  pieces: Piece[];
}

export type GameStatus =
  | "waiting"
  | "playing"
  | "finished";

export interface Game {
  id: string;

  status: GameStatus;

  turn: number;

  dice: number | null;

  lastDice?: number | null;

  winner?: number | null;

  players: Player[];
}