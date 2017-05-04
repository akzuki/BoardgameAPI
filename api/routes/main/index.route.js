const express = require('express');
const router = express.Router();
const passport = require('passport');

const productRoute = require('./product.route');
const orderRoute = require('./order.route');

router.use('/product', productRoute);
router.use('/order', passport.authenticate('useAuthStragedy', {
    session: false
}), orderRoute);

module.exports = router;
