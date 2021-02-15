const express = require('express')
const router = express()

const PostController = require('../controllers/PostController');
const auth = require('../middleware/auth'); //authorization
const admin = require('../middleware/admin'); //authorization


// dashboard - only logged in
router.get('/', auth, PostController.dashboard);

// admin dashboard - logged in + admin
router.get('/admin', [auth, admin], PostController.admin);

module.exports = router;