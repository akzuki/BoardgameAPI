const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const dbConfig = require('./config/db');
const bodyParser = require('body-parser')
mongoose.Promise = global.Promise;

//Routes
const index = require('./routes/index');
const user = require('./routes/user');

const app = express();

console.log(dbConfig.connectionUrl);

mongoose.connect(dbConfig.connectionUrl).then(() => {
    console.log('Connected successfully.');
}, err => {
    console.log('Connection to db failed: ' + err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', user);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.send(err);
});

module.exports = app;
