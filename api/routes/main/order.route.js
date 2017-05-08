const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const orderController = require('../../controllers/orderController');

/**
 * @api {get} /api/order Get orders
 * @apiName GetOrder
 * @apiGroup User
 * @apiHeader {String} Authorization user's token
 * @apiSuccess {Object} response status code and orders.
 * @apiError {Object} 401 Unauthorized
 */
router.get('/', orderController.getOrdersByUserId);

/**
 * @api {post} /api/order Place order
 * @apiName PlaceOrder
 * @apiGroup User
 * @apiParam {String} boardgameId id of product
 * @apiParam {String} shippingAddress shipping address
 * @apiParam {String} stripeToken stripe token
 * @apiSuccess {Object} response status code and message.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
router.post('/', validation.validateOrderBoardgameParams, orderController.createOrder);

module.exports = router;
