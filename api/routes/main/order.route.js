const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const orderController = require('../../controllers/orderController');

router.get('/', orderController.getOrdersByUserId);
router.post('/', validation.validateOrderBoardgameParams, orderController.createOrder);

module.exports = router;
