const COLORS = ["pink", "purple", "green", "blue"];

const GAME_STATUS = {
	WAITING: "waiting",
	PLAYING: "playing",
	PAUSED: "paused",
	FINISHED: "finished"
};

const BOARD_SIZE = 68;

const START_POSITIONS = {
	pink: 0,
	purple: 17,
	green: 34,
	blue: 51
};

const SAFE_CELLS = [
	0,5,12,17,22,29,34,39,46,51,56,63
];

const DISCONNECT_TIMEOUT = 60000;
const TURN_TIMEOUT = 30000;

module.exports = {
	COLORS,
	GAME_STATUS,
	BOARD_SIZE,
	START_POSITIONS,
	SAFE_CELLS,
	DISCONNECT_TIMEOUT,
	TURN_TIMEOUT
};