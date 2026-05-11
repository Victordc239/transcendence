const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const friendsController = require('../controllers/friendsController');

router.post('/request/:id', authMiddleware, friendsController.sendRequest);

router.post('/accept/:id', authMiddleware, friendsController.acceptRequest);

router.delete('/:id', authMiddleware, friendsController.deleteRelation);

router.get('/', authMiddleware, friendsController.getFriends);

router.get('/online', authMiddleware, friendsController.getOnlineFriends);

router.get('/requests', authMiddleware, friendsController.getPendingRequests);

module.exports = router;