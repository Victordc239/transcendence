function createPieces() {
	return Array.from({ length: 4 }).map((_, index) => ({
		id: index,
		state: "base",
		trackIndex: 0,
		homeIndex: 0
	}));
}

module.exports = createPieces;