const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');

router.route('/')
    .get((req, res, next) => {
        res.send('Whatcha doin?');
    })
    .post((req, res, next) => {
        console.log(req.body);
    });

router.use('/user', userRoute);

module.exports = router;
