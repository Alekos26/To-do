//All these functions have to be async since the database will return promises
//We use the express-async-handler package to wrap all the functions instead of try-catch

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Todo = require('../models/todoModel');
const jwt = require('jsonwebtoken')


const getTodo = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id

    //Get user from token
    const user = await User.findById(userId);

    const activeTodos = await Todo.find({ user: user._id, status: false }, {text: 1});
    const completeTodos = await Todo.find({ user: user._id, status: true }, {text: 1});


    res.status(200).render('todos', {activeTodos: activeTodos, completeTodos: completeTodos });
});

const postTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400).render('error400e');
    }

    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id

    //Get user from token
    const user = await User.findById(userId);

    const todo = await Todo.create({
        text: req.body.text,
        user: user._id,
    });

    return res.status(201).redirect('/todos/get');
});

const deleteTodo = asyncHandler(async (req, res) => {
    const textId = req.params.id
    const deletedTodo = await Todo.deleteOne({_id: textId})
    return res.status(200).redirect('/todos/get');
});

const updateStatus = asyncHandler(async(req,res) => {
    const textId = req.params.id;
    const updatedTodo = await Todo.updateOne({_id: textId},{$set:{status:true}})
    return res.status(200).redirect('/todos/get');
})

module.exports = {
    getTodo,
    postTodo,
    deleteTodo,
    updateStatus
};
