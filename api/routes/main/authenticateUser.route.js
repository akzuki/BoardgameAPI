const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../middlewares/validation');
const facebookValidation = require('../../middlewares/facebook-validation');

const authenticateUserController = require('../../controllers/authenticateUserController');


// Login and register for users

/**
 * @api {post} /api/auth/facebookLogin Facebook login
 * @apiName FacebookLogin
 * @apiGroup User
 * @apiParam {String} facebookId user's facebookid
 * @apiParam {String} token facebook access token
 * @apiParam {String} firstName first name
 * @apiParam {String} lastName last name
 * @apiParam {String} email email
 * @apiSuccess {Object} response status code and token.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
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
