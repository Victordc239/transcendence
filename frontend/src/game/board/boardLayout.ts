export type Point = { x: number; y: number };

export const BOARD_SIZE = 600;

/*export const TRACK = [
  { x: 120, y: 420 },
  { x: 160, y: 420 },
  { x: 200, y: 420 },
]

export const TRACK_COORDS = [
  grid(6,1),
  grid(6,2),
  grid(6,3),
]

export const HOME_PATHS = {
  pink: [],
  blue: [],
  green: [],
  purple: [],
}

export const SAFE_CELLS = [0, 8, 13]

const PIECE_STACK_OFFSETS = [
  { x: 0, y: 0 },
  { x: 10, y: -10 },
  { x: -10, y: 10 },
]*/

/* =========================
   GRID BASE (15x15 PARCHE REAL)
========================= */

export const GRID_SIZE = 15;
export const CELL = BOARD_SIZE / GRID_SIZE;

/* =========================
   CONVERT GRID → PIXEL
========================= */

export function grid(x: number, y: number): Point {
  return {
    x: x * CELL + CELL / 2,
    y: y * CELL + CELL / 2,
  };
}

/* =========================
   MAIN TRACK (REAL PARCHÍS PATH)
   recorrido rectangular
========================= */

export const mainTrack: Point[] = [
  // borde superior (0 → 5)
  ...Array.from({ length: 6 }).map((_, i) => grid(7 + i, 0)),

  // derecha
  ...Array.from({ length: 6 }).map((_, i) => grid(14, 1 + i)),

  // abajo derecha
  ...Array.from({ length: 6 }).map((_, i) => grid(13 - i, 14)),

  // abajo izquierda
  ...Array.from({ length: 6 }).map((_, i) => grid(0, 13 - i)),

  // izquierda
  ...Array.from({ length: 6 }).map((_, i) => grid(1 + i, 0)),
];

/* =========================
   CENTER GOAL (CRUZ CENTRAL)
========================= */

export const CENTER: Point = grid(7, 7);

/* =========================
   BASE POSITIONS
========================= */

export const bases: Record<string, Point[]> = {
  pink: [
    grid(1, 1),
    grid(2, 1),
    grid(1, 2),
    grid(2, 2),
  ],
  blue: [
    grid(12, 1),
    grid(13, 1),
    grid(12, 2),
    grid(13, 2),
  ],
  green: [
    grid(1, 12),
    grid(2, 12),
    grid(1, 13),
    grid(2, 13),
  ],
  purple: [
    grid(12, 12),
    grid(13, 12),
    grid(12, 13),
    grid(13, 13),
  ],
};