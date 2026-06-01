const BOARD_MAP = require('./boardMap');

function getBoardCoordinates(globalPosition)
{
	if (globalPosition < 0 || globalPosition >= BOARD_MAP.length)
	{
		return null;
	}

	return BOARD_MAP[globalPosition];
}

module.exports = getBoardCoordinates;