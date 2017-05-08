const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/orderController');

/**
 * @api {get} /panel/order Retrieve store's orders
 * @apiName StoreOrder
 * @apiGroup Panel
* @apiHeader {String} Authorization store's token
 * @apiSuccess {Object[]} list of orders
 * @apiError {Object} 400 invalid params
 */
router.get('/', orderController.getOrdersByStoreId);

module.exports = router;
