const express = require('express');

const router = express.Router();


// controller function
const {loginUser, signupUser, userInfo} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

// login router
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// user info
router.post('/user-info', authMiddleware, userInfo);


module.exports = router;