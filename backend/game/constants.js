const COLORS = [
  "pink",
  "purple",
  "green",
  "blue"
];

/* =================================
   GAME STATUS
================================= */

const GAME_STATUS = {
  WAITING: "waiting",
  PLAYING: "playing",
  FINISHED: "finished"
};

/* =================================
   BOARD
================================= */

/*
  El tablero principal tiene 68 casillas.
*/

const BOARD_SIZE = 68;

/*
  Cada color empieza en una posición distinta.
*/

const START_POSITIONS = {
  pink: 0,
  purple: 17,
  green: 34,
  blue: 51
};

/*
  Entrada al pasillo final.
*/

const FINAL_ENTRY = {
  pink: 67,
  purple: 16,
  green: 33,
  blue: 50
};

/*
  Casillas seguras clásicas.
*/

const SAFE_CELLS = [
  0,
  5,
  12,
  17,
  22,
  29,
  34,
  39,
  46,
  51,
  56,
  63
];

/*
  Posiciones especiales.
*/

const BASE_POSITION = -1;

/*
  Pasillo final:
  68 -> 74
*/

const FINAL_STRETCH_START = 68;

const FINAL_POSITION = 74;

module.exports = {
  COLORS,
  GAME_STATUS,
  BOARD_SIZE,
  START_POSITIONS,
  FINAL_ENTRY,
  SAFE_CELLS,
  BASE_POSITION,
  FINAL_STRETCH_START,
  FINAL_POSITION
};