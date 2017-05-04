'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const validator = require('express-validator');
const error = require('../helpers/api-error');
const path = require('path');

const passportJWT = require('../api/middlewares/passport-jwt');

const index = require('../api/routes/index.route');

const app = express();

app.use(helmet());
app.use(cors());
app.use(passport.initialize());

passportJWT.useUserAuthenticationStragedy(passport);
passportJWT.useStoreAuthenticationStragedy(passport);
require('../api/middlewares/passport-facebook')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(validator());

app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));

app.use('/', index);

app.use((err, req, res, next) => {
    console.log(err);
    if (!(err instanceof error.APIError)) {
        const apiError = new error.APIError(err.message, err.status);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(error.notFoundError);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status).json({
        status: err.status,
        description: err.message
    });
});

module.exports = app;
