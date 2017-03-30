const User = require('../models/user.model');
const responseHandler = require('../helpers/responseHandler');

function createUser(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then((savedUser) => res.json(responseHandler.successResponse(savedUser)))
        .catch((err) => next(err));
}

function getAllUsers(req, res, next) {
    User.find()
        .then((users) => res.json(responseHandler.successResponse(users)))
        .catch((err) => next(err));
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
};
