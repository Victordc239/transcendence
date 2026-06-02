import { mainTrack, bases } from "../boardPositions";

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
 * CASILLAS DEL TABLERO (YA ALINEADAS CON BACKEND)
 */
export { mainTrack, bases };