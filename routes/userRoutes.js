const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    getUser,
    logoutUser,
} = require('../controllers/userController');
const requireAuth = require('../Middlewares/authMiddleaware')


router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/data', requireAuth,  getUser);

router.get('/logout', logoutUser);

module.exports = router;