const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const csurf = require('csurf');

require('./models/User');
require('./models/Food')
require('./config/passport'); 
require('./models/Exercise');
require('./models/Workout')
const passport = require('passport');

const { isProduction } = require('./config/keys');

const app = express();

app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 

app.use(passport.initialize()); 

if (!isProduction) {
  app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const foodsRouter = require('./routes/api/foods');
const exercisesRouter = require('./routes/api/exercises');
const nutritionRouter = require('./routes/api/nutrition');
const workoutsRouter = require('./routes/api/workout');

app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/workout', workoutsRouter);

if (isProduction) {
    const path = require('path');

    app.get('/', (req, res) => {
            res.cookie('CSRF-TOKEN', req.csrfToken());
            res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });

    app.use(express.static(path.resolve("../frontend/build")));
    
    app.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('CSRF-TOKEN', req.csrfToken());
        
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500
    res.status(statusCode);
    
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;