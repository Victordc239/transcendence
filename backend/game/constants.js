const COLORS = [
	"pink",
	"purple",
	"green",
	"blue"
];

const GAME_STATUS = {
	WAITING: "waiting",
	PLAYING: "playing",
	PAUSED: "paused",
	FINISHED: "finished"
};

// PARCHÍS REAL
const MAIN_TRACK_SIZE = 68;

const FINAL_STRETCH_SIZE = 7;

const FINAL_POSITION = MAIN_TRACK_SIZE + FINAL_STRETCH_SIZE;

// Salidas reales

const START_POSITIONS = {
	pink: 39,
	purple: 5,
	green: 29,
	blue: 63
};

// Casillas seguras
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

// Posiciones especiales

const BASE_POSITION = -1;

const FINAL_STRETCH_START = MAIN_TRACK_SIZE;

const DISCONNECT_TIMEOUT = 60000;

const TURN_TIMEOUT = 30000;

const HOME_ENTRIES = {
	pink: 33,
	purple: 67,
	green: 16,
	blue: 50
};

module.exports = {
	COLORS,
	GAME_STATUS,
	MAIN_TRACK_SIZE,
	FINAL_STRETCH_SIZE,
	FINAL_POSITION,
	FINAL_STRETCH_START,
	BASE_POSITION,
	START_POSITIONS,
	SAFE_CELLS,
	HOME_ENTRIES,
	DISCONNECT_TIMEOUT,
	TURN_TIMEOUT
};