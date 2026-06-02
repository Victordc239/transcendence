function createPieces()
{
	return Array.from({ length: 4 }).map((_, index) => ({
		id: index,
		state: 'base',
		/*| -1 = casa
		| 0..67 = recorrido exterior
		| 68..74 = pasillo final*/
		steps: -1
	}));
}

module.exports = createPieces;