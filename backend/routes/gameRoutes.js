const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const gameController = require('../controllers/gameController');

router.post('/', authMiddleware, gameController.createGame);
router.get('/:id', authMiddleware, gameController.getGame);

module.exports = router;