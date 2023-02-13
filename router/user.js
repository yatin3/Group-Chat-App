const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user');
const userAuthentication = require('../middleware/auth');

router.post('/signup',userControllers.postUser);

router.post('/login',userControllers.checkUser);

router.get('/getAllUsers',userAuthentication.authenticate,userControllers.getAllUser);

module.exports = router;