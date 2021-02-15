const express = require('express')
const router = express()

const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

// get current user
router.get('/me', auth, UserController.me);


// register new user
router.post('/register', UserController.register);


// login user
router.post('/login', UserController.login);



module.exports = router;