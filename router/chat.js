const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');
const userAuthentication = require('../middleware/auth');

router.post('/addChat',userAuthentication.authenticate,chatController.postChat);

module.exports = router;
