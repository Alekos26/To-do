const express = require('express');
const router = express.Router();
const {
    homePage,
    loginPage,
    signupPage,
    todosPage,
} = require('../controllers/templatesController');
const requireAuth = require('../Middlewares/authMiddleaware')

router.get('/', homePage);

router.get('/login', loginPage);

router.get('/signup', signupPage);

router.get('/todos', requireAuth, todosPage);


module.exports = router;
