const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controller/userController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser);
router.get('/current', validateToken ,currentUser); // auth guard for specific route

module.exports = router;