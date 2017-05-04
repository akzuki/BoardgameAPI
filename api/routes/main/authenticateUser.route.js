const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../middlewares/validation');
const facebookValidation = require('../../middlewares/facebook-validation');

const authenticateUserController = require('../../controllers/authenticateUserController');


// Login and register for users
router.post('/facebookLogin', validation.validateFacebookLoginParams, facebookValidation.validateFacebookAccessToken, authenticateUserController.handleFacebookLogin);

router.get('/facebook', passport.authenticate('facebook', {
    session: false,
    scope: ['email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    session: false
}), authenticateUserController.handleLoginCallback);
// End

module.exports = router;
