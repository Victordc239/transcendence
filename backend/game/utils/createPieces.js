const { BASE_POSITION } = require('../constants');

function createPieces()
{
	return[
		{
			position: BASE_POSITION
		},
		{
			position: BASE_POSITION
		},
		{
			position: BASE_POSITION
		},
		{
			position: BASE_POSITION
		}
	];
}

module.exports = createPieces;