const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./database/db');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

connectDB();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json()); //To add middlewares that only parse json
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); //To add middlewares that only parse urlencoded
app.use(cookieParser());

app.use((req, res, next) => {
    res.locals.user = req.cookies.jwt;
    next()});
app.use('/', require('./routes/templatesRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/todos', require('./routes/todoRoutes'));


app.listen(port, ()=> console.log(`Server runs in port ${port}`));
