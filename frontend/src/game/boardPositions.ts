export type Point = {
  x: number;
  y: number;
};

export const BOARD_SIZE = 600;

// centro del tablero
export const CENTER = { x: 300, y: 300 };

// radio del círculo principal
const RADIUS = 240;

/**
 * 52 posiciones del circuito principal
 * (vamos a empezar simple: círculo perfecto, luego refinamos a parchís real)
 */
export const mainTrack: Point[] = Array.from({ length: 52 }).map((_, i) => {
  const angle = (i / 52) * 2 * Math.PI - Math.PI / 2;

  return {
    x: CENTER.x + RADIUS * Math.cos(angle),
    y: CENTER.y + RADIUS * Math.sin(angle),
  };
});

/**
 * Bases de jugadores (4 esquinas)
 */
export const bases: Record<string, Point[]> = {
  red: [
    { x: 80, y: 80 },
    { x: 140, y: 80 },
    { x: 80, y: 140 },
    { x: 140, y: 140 },
  ],
  blue: [
    { x: 460, y: 80 },
    { x: 520, y: 80 },
    { x: 460, y: 140 },
    { x: 520, y: 140 },
  ],
  green: [
    { x: 80, y: 460 },
    { x: 140, y: 460 },
    { x: 80, y: 520 },
    { x: 140, y: 520 },
  ],
  yellow: [
    { x: 460, y: 460 },
    { x: 520, y: 460 },
    { x: 460, y: 520 },
    { x: 520, y: 520 },
  ],
};