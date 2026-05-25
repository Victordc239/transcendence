const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');

const {BASE_POSITION, FINAL_ENTRY, FINAL_STRETCH_START, FINAL_POSITION} = require('../constants');

function applyMove(game, playerId, pieceIndex)
{
	const player = getPlayer(game, playerId);
	const piece = getPiece(player, pieceIndex);

	//Sale de casa
	if (piece.position === BASE_POSITION)
	{
		piece.position = 0;
		return;
	}

	let newPosition = piece.position + game.dice;

	// Entrar al pasillo final
	if (piece.position <= FINAL_ENTRY[player.color] && newPosition > FINAL_ENTRY[player.color])
	{
		const overflow = newPosition - FINAL_ENTRY[player.color] - 1;
		newPosition = FINAL_STRETCH_START + overflow;
	}

	// Limitar meta
	if (newPosition > FINAL_POSITION)
	{
		newPosition = FINAL_POSITION;
	}

	piece.position = newPosition;
}

module.exports = applyMove;