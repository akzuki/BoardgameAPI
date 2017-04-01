const User = require('../models/user.model');
const responseHandler = require('../../helpers/responseHandler');

const createUser = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.create(user)
        .then((savedUser) => res.json(responseHandler.successResponse(savedUser)))
        .catch((err) => next(err));
};

const getAllUsers = (req, res, next) => {
    User.find()
        .then((users) => res.json(responseHandler.successResponse(users)))
        .catch((err) => next(err));
};

// Test Login
const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email: email
    }).then((user) => {
        return user.validatePassword(password);
    }).then((isMatch) => {
        console.log(isMatch);
    }).catch((err) => {
        next(err);
    });
};

module.exports = {
    createUser,
    getAllUsers,
    login
};
