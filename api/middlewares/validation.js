'use strict';

const mongoose = require('mongoose');
const error = require('../../helpers/api-error');


const validateFacebookLoginParams = (req, res, next) => {
    req.checkBody('facebookId', 'Invalid facebookId').notEmpty().isInt();
    req.checkBody('token', 'Invalid token').notEmpty();
    req.checkBody('firstName', 'Invalid firstName').notEmpty();
    req.checkBody('lastName', 'Invalid lastName').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateStoreLoginParams = (req, res, next) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 6
    });

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateStoreRegisterParams = (req, res, next) => {
    req.checkBody('name', 'Invalid store name').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 6
    });
    req.checkBody('address', 'Invalid address').notEmpty();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateCreateBoardgameParams = (req, res, next) => {
    req.checkBody('photoUrl', 'Invalid photo url').notEmpty();
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkBody('description', 'Invalid description').notEmpty();
    req.checkBody('category', 'Invalid category').notEmpty();
    req.checkBody('player', 'Invalid player').notEmpty();
    req.checkBody('time', 'Invalid time').notEmpty();
    req.checkBody('ages', 'Invalid ages').notEmpty();
    req.checkBody('price', 'Invalid price').notEmpty().isFloat();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateDeleteBoardgameParams = (req, res, next) => {
    const isValidBoardgameId = mongoose.Types.ObjectId.isValid(req.body.boardgameId);
    if (!isValidBoardgameId) {
        return next(error.badRequestError);
    }
    req.checkBody('boardgameId', 'Invalid boardgameId').notEmpty();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateOrderBoardgameParams = (req, res, next) => {
    const isValidBoardgameId = mongoose.Types.ObjectId.isValid(req.body.boardgameId);
    if (!isValidBoardgameId) {
        return next(error.badRequestError);
    }
    req.checkBody('shippingAddress', 'Invalid shippingAddress').notEmpty();
    req.checkBody('stripeToken', 'Invalid stripeToken').notEmpty();
    req.checkBody('boardgameId', 'Invalid boardgameId').notEmpty();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return next(error.badRequestError);
        }
        next();
    });
};

const validateBoardgameId = (req, res, next) => {
    const isValidBoardgameId = mongoose.Types.ObjectId.isValid(req.params.boardgameId);
    if (!isValidBoardgameId) {
        return next(error.badRequestError);
    }
    next();
};

module.exports = {
    validateFacebookLoginParams,
    validateStoreLoginParams,
    validateStoreRegisterParams,
    validateCreateBoardgameParams,
    validateDeleteBoardgameParams,
    validateOrderBoardgameParams,
    validateBoardgameId
};
