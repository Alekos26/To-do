const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //Check for invalid fields
    if (!name || !email || !password) {
        res.status(400);
        res.render('error400c')
    }

    //Check if user exists
    const existingEmail = await User.findOne({ email });
    const existingName = await User.findOne({name});

    if (existingEmail || existingName) {
        res.status(400);
        res.render('error400')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201)
    } else {
        res.status(400).render('error400d');
    }

    res.redirect('/login');
});

const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    const userId = user._id

    if (name && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(userId);
       return res.status(201).cookie('jwt', token, {httpOnly: true}).redirect('/todos/get')
    } else {
     res.status(400).render('error400b')
    }

});

const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({ id: _id, name, email });
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1 }).redirect('/');
});

module.exports = {
    createUser,
    loginUser,
    getUser,
    logoutUser,
};
