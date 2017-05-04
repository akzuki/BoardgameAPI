const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticateUserRoute = require('./main/authenticateUser.route');
const authenticateStoreRoute = require('./panel/authenticateStore.route');

const panelRoute = require('./panel/index.route');
const mainRoute = require('./main/index.route');
// MARK: Main route


router.use('/panel/auth', authenticateStoreRoute);
router.use('/panel', passport.authenticate('storeAuthStragedy', {
    session: false
}), panelRoute);

router.use('/api/auth', authenticateUserRoute);
router.use('/api', mainRoute);

module.exports = router;
