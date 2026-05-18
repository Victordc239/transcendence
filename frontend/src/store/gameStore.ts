import { create } from "zustand";

/*type Piece = {
  position: string | number;
};

type Player = {
  id: number;
  color: string;
  pieces: Piece[];
};

type Game = {
  id: string;
  players: Player[];
  turn: number;
  dice: number | null;
  status: "waiting" | "playing" | "finished";
};*/

export type PieceState =
  | "base"
  | "track"
  | "home"
  | "finished";

export type Piece = {
  id: string;
  ownerId: number;

  state: PieceState;

  trackIndex: number;   // 0–55 (global board)
  homeIndex: number;    // 0–5 (final lane)

  isAnimating?: boolean;
};

export type Player = {
  id: number;
  color: "red" | "blue" | "green" | "yellow";
  pieces: Piece[];
};

export type GameStatus = "waiting" | "playing" | "finished";

export type Game = {
  id: string;
  players: Player[];

  turn: number;
  dice: number | null;

  status: GameStatus;

  lastMove?: {
    pieceId: string;
    from: number;
    to: number;
  };
};

type GameStore = {
  game: Game | null;
  setGame: (game: Game) => void;
  clear: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  setGame: (game) => set({ game }),
  clear: () => set({ game: null }),
}));