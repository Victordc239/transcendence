export type Point = { x: number; y: number };

export const BOARD_SIZE = 600;

/* =========================
   MAIN TRACK (0 - 55)
========================= */

export const mainTrack: Point[] = [
  // aquí reutilizas tu actual mainTrack
];

/* =========================
   CENTER
========================= */

export const CENTER: Point = {
  x: 300,
  y: 300,
};

/* =========================
   BASE POSITIONS
========================= */

export const bases: Record<string, Point[]> = {
  red: [
    { x: 80, y: 80 },
    { x: 120, y: 80 },
    { x: 80, y: 120 },
    { x: 120, y: 120 },
  ],
  blue: [
    { x: 480, y: 80 },
    { x: 520, y: 80 },
    { x: 480, y: 120 },
    { x: 520, y: 120 },
  ],
  green: [
    { x: 80, y: 480 },
    { x: 120, y: 480 },
    { x: 80, y: 520 },
    { x: 120, y: 520 },
  ],
  yellow: [
    { x: 480, y: 480 },
    { x: 520, y: 480 },
    { x: 480, y: 520 },
    { x: 520, y: 520 },
  ],
};