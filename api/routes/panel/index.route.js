const express = require('express');
const router = express.Router();

const productRoute = require('./product.route');
const orderRoute = require('./order.route');

router.use('/product', productRoute);
router.use('/order', orderRoute);


module.exports = router;
