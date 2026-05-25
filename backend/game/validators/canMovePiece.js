const getPlayer = require('../utils/getPlayer');
const getPiece = require('../utils/getPiece');
const getGlobalPosition = require('../utils/getGlobalPosition');
const getBlockades = require('../rules/getBlockades');

const { BOARD_SIZE, BASE_POSITION, FINAL_POSITION, FINAL_STRETCH_START, GAME_STATUS} = require('../constants');

function canMovePiece(game, playerId, pieceIndex)
{

	/* =============================
	GAME STARTED
	============================= */
	if (game.status !== GAME_STATUS.PLAYING)
	{
		return {
			ok: false,
			error: "Game has not started yet"
		};
	}

	/* =============================
	TURN VALIDATION
	============================= */
	if (game.turn !== playerId)
	{
		return {
			ok: false,
			error: "Not your turn"
		};
	}

	const player = getPlayer(game, playerId);
	if (!player)
	{
		return {
			ok: false,
			error: "Player not found"
		};
	}

	const piece = getPiece(player, pieceIndex);
	if (!piece)
	{
		return {
			ok: false,
			error: "Piece not found"
		};
	}

	/* =============================
	DICE ROLLED
	============================= */
	if (game.dice === null)
	{
		return {
			ok: false,
			error: "Roll dice first"
		};
	}

	/* =============================
	NEED 5 TO LEAVE BASE
	============================= */
	if (piece.position === BASE_POSITION && game.dice !== 5)
	{
		return {
			ok: false,
			error: "Need 5 to leave base"
		};
	}

	/* =============================
	CANNOT EXCEED GOAL
	============================= */
	if (piece.position !== BASE_POSITION && piece.position + game.dice > FINAL_POSITION)
	{
		return {
			ok: false,
			error: "Move exceeds final position"
		};
	}

	/* =============================
	BLOCKADES
	============================= */
	if (piece.position !== BASE_POSITION && piece.position < FINAL_STRETCH_START)
	{
		const blockades = getBlockades(game);

		const currentGlobal = getGlobalPosition(player.color, piece.position);

		for (let step = 1; step <= game.dice; step++)
		{
			const nextGlobal = (currentGlobal + step) % BOARD_SIZE;

			const blocked = blockades.find(
				blockade =>
				blockade.position === nextGlobal);

			if (blocked)
			{
				return {
					ok: false,
					error: "Blockade blocks the way"
				};
			}
		}
	}

	return {
		ok: true
	};
}

module.exports = canMovePiece;