const COLORS = ["pink", "purple", "green", "blue"];

/* =================================
  GAME STATUS
================================= */
const GAME_STATUS = {
	WAITING: "waiting",
	PLAYING: "playing",
	PAUSED: "paused",
	FINISHED: "finished"
};

/* =================================
  BOARD
================================= */
const BOARD_SIZE = 68;
const START_POSITIONS = {
	pink: 0,
	purple: 17,
	green: 34,
	blue: 51
};

const FINAL_ENTRY = {
	pink: 67,
	purple: 16,
	green: 33,
	blue: 50
};

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

const BASE_POSITION = -1;
const FINAL_STRETCH_START = 68;
const FINAL_POSITION = 74;

/* =================================
  RECONNECTION
================================= */
const DISCONNECT_TIMEOUT = 60000;

/* =================================
  TURN TIMER
================================= */
const TURN_TIMEOUT = 30000;

module.exports = {
	COLORS,
	GAME_STATUS,
	BOARD_SIZE,
	START_POSITIONS,
	FINAL_ENTRY,
	SAFE_CELLS,
	BASE_POSITION,
	FINAL_STRETCH_START,
	FINAL_POSITION,
	DISCONNECT_TIMEOUT,
	TURN_TIMEOUT
};