const express = require('express');
const router = express.Router();
const {
    getTodo,
    postTodo,
//    updateTodo,
    deleteTodo,
    updateStatus
} = require('../controllers/todoController');
const requireAuth = require('../Middlewares/authMiddleaware');


router.get('/get', requireAuth, getTodo);

router.post('/post', requireAuth, postTodo);

router.post('/:id/done', requireAuth, updateStatus);

router.post('/:id/delete', requireAuth, deleteTodo);

module.exports = router;