const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');
const userAuthentication = require('../middleware/auth');

router.post('/addChat',userAuthentication.authenticate,chatController.postChat);

router.get('/getChats',userAuthentication.authenticate,chatController.getAllChats);

router.get('/getCount',userAuthentication.authenticate,chatController.getCounts);

router.post('/addGroupChat',userAuthentication.authenticate,chatController.postGroupChat);


module.exports = router;
