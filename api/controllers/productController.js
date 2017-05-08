'use strict';

const Boardgame = require('../models/boardgame.model');

const responseHandler = require('../../helpers/responseHandler');

const error = require('../../helpers/api-error');


const uploadBoardgamePhoto = (req, res, next) => {
    if (req.file) {
        res.json(responseHandler.successResponse(req.file.filename));
    } else {
        next(error.internalServerError);
    }
};

const createBoardgame = (req, res, next) => {
    const boardgame = new Boardgame({
        'photoUrl': req.body.photoUrl,
        'title': req.body.title,
        'description': req.body.description,
        'player': req.body.player,
        'time': req.body.time,
        'ages': req.body.ages,
        'price': req.body.price,
        'store': req.user._id
    });
    Boardgame.create(boardgame)
        .then((savedBoardgame) => res.json(responseHandler.successResponse(`Successfully created boardgame ${savedBoardgame._id}`)))
        .catch((err) => next(err));
};

const updateBoardgame = (req, res, next) => {
    Boardgame.findOneAndUpdate({
            _id: req.params.boardgameId,
            store: req.user._id
        }, {
            $set: req.body
        })
        .then((response) => {
            if (response) {
                res.json(responseHandler.successResponse(`Successfully updated boardgame ${req.params.boardgameId}`));
            } else {
                throw error.notFoundError;
            }
        })
        .catch((err) => next(err));
};

const deleteBoardgameById = (req, res, next) => {
    Boardgame.findOneAndRemove({
            _id: req.body.boardgameId,
            store: req.user._id
        })
        .then((document) => {
            if (document) {
                res.json(responseHandler.successResponse(`Successfully deleted boardgame ${req.body.boardgameId}`));
            } else {
                next(error.notFoundError);
            }
        })
        .catch((err) => next(err));
};

const getBoardgamesByStoreId = (req, res, next) => {
    Boardgame.find({
            store: req.user._id
        }, {
            store: 0,
            __v: 0
        })
        .then((boardgames) => res.json(responseHandler.successResponse(boardgames)))
        .catch((err) => next(err));
};

const getAllBoardgames = (req, res, next) => {
    Boardgame.find({}, {
            __v: 0
        })
        .populate('store', {
            _id: 1,
            name: 1,
            email: 1,
            address: 1
        })
        .then((boardgames) => res.json(responseHandler.successResponse(boardgames)))
        .catch((err) => next(err));
};

const getBoardgameById = (req, res, next) => {
    Boardgame.findById(req.params.boardgameId, {
            __v: 0
        })
        .populate('store', {
            _id: 1,
            name: 1,
            email: 1,
            address: 1
        })
        .then((boardgame) => boardgame ? res.json(responseHandler.successResponse(boardgame)) : next(error.notFoundError))
        .catch((err) => next(err));
};

module.exports = {
    createBoardgame,
    updateBoardgame,
    getBoardgamesByStoreId,
    deleteBoardgameById,
    uploadBoardgamePhoto,
    getAllBoardgames,
    getBoardgameById
};
