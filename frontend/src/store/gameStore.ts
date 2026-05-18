import { create } from "zustand";

type Piece = {
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