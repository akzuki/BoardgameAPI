'use strict';

const Order = require('../models/order.model');
const Boardgame = require('../models/boardgame.model');
const responseHandler = require('../../helpers/responseHandler');

let stripe = require('stripe')('sk_test_4UqZmMNNtwgEGnks05AhNuTb');

const error = require('../../helpers/api-error');

const createOrder = (req, res, next) => {
    const user = req.user;
    Boardgame.findById(req.body.boardgameId)
        .then((boardgame) => {
            if (boardgame) {
                return new Promise(function(resolve, reject) {
                    stripe.charges.create({
                            amount: boardgame.price * 100,
                            currency: 'eur',
                            source: req.body.stripeToken, // obtained with Stripe.js
                            description: `Charge for ${user.firstName} ${user.lastName} (${user._id}) buying boardgame ${boardgame.title} (${boardgame._id})`
                        }).then((charge) => resolve({
                            charge: charge,
                            boardgame: boardgame
                        }))
                        .catch((err) => reject(err));
                });
            } else {
                throw error.notFoundError;
            }
        }).then((response) => {
            const order = new Order({
                item: response.boardgame._id,
                buyer: user._id,
                seller: response.boardgame.store,
                shippingAddress: req.body.shippingAddress,
                transactionId: response.charge.id
            });
            return Order.create(order);
        }).then((savedOrder) => {
            res.json(responseHandler.successResponse(`Successfully bought boardgame ${savedOrder.item}`));
        }).catch((err) => {
            next(err);
        });
};

const getOrdersByStoreId = (req, res, next) => {
    Order.find({
            seller: req.user._id
        }, {
            _id: 1,
            item: 1,
            buyer: 1,
            shippingAddress: 1,
            timestamp: 1
        })
        .populate('item', {
            store: 0,
            __v: 0,
            reviews: 0
        })
        .populate('buyer')
        .then((orders) => res.json(responseHandler.successResponse(orders)))
        .catch((err) => next(err));
};

const getOrdersByUserId = (req, res, next) => {
    Order.find({
            buyer: req.user._id
        }, {
            _id: 1,
            item: 1,
            seller: 1,
            timestamp: 1
        })
        .populate('item', {
            store: 0,
            __v: 0,
            reviews: 0
        })
        .populate('seller', {
            password: 0,
            __v: 0,
            createdAt: 0
        })
        .then((orders) => res.json(responseHandler.successResponse(orders)))
        .catch((err) => next(err));
};

module.exports = {
    createOrder,
    getOrdersByStoreId,
    getOrdersByUserId
};
