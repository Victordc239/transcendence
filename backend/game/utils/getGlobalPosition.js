const {
  START_POSITIONS,
  BOARD_SIZE
} = require('../constants');

/*
  Convierte posición relativa
  a posición global del tablero.
*/

function getGlobalPosition(color, relativePosition) {

  return (
    START_POSITIONS[color] +
    relativePosition
  ) % BOARD_SIZE;
}

module.exports = getGlobalPosition;