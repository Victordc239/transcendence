export type Point = { x: number; y: number };

export const BOARD_SIZE = 1600;

/**
 * Centro del tablero real SVG
 */
export const CENTER: Point = {
  x: 800,
  y: 800,
};

/**
 * TRACK REAL (temporal pero coherente con SVG)
 * → luego lo refinamos a casillas exactas del diseño
 */
export const mainTrack: Point[] = [
  // TOP (izquierda → derecha)
  { x: 420, y: 420 },
  { x: 520, y: 420 },
  { x: 620, y: 420 },
  { x: 720, y: 420 },
  { x: 820, y: 420 },
  { x: 920, y: 420 },
  { x: 1020, y: 420 },
  { x: 1120, y: 420 },

  // RIGHT
  { x: 1180, y: 520 },
  { x: 1180, y: 620 },
  { x: 1180, y: 720 },
  { x: 1180, y: 820 },
  { x: 1180, y: 920 },

  // BOTTOM
  { x: 1020, y: 1180 },
  { x: 920, y: 1180 },
  { x: 820, y: 1180 },
  { x: 720, y: 1180 },

  // LEFT
  { x: 420, y: 1020 },
  { x: 420, y: 920 },
  { x: 420, y: 820 },
  { x: 420, y: 720 },
  { x: 420, y: 620 },
  { x: 420, y: 520 },
];

export const bases: Record<string, Point[]> = {
  pink: [
    { x: 380, y: 380 },
    { x: 460, y: 380 },
    { x: 380, y: 460 },
    { x: 460, y: 460 },
  ],
  blue: [
    { x: 1140, y: 380 },
    { x: 1220, y: 380 },
    { x: 1140, y: 460 },
    { x: 1220, y: 460 },
  ],
  green: [
    { x: 380, y: 1140 },
    { x: 460, y: 1140 },
    { x: 380, y: 1220 },
    { x: 460, y: 1220 },
  ],
  purple: [
    { x: 1140, y: 1140 },
    { x: 1220, y: 1140 },
    { x: 1140, y: 1220 },
    { x: 1220, y: 1220 },
  ],
};