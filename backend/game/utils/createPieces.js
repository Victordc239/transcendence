function createPieces()
{
	return Array.from({ length: 4 }).map((_, index) => ({
		id: index,
		state: 'base',

		// 🔥 EL FRONTEND USA ESTO
		position: -1
	}));
}

module.exports = createPieces;