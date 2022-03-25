const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const checkUser = asyncHandler(async (req,res,next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
                //console.log(decodedToken);
                next();
            }
        } )

    } else{
        res.local.user = null;
        next()
    }
})

module.exports = checkUser;