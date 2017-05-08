const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');

const authenticateStoreController = require('../../controllers/authenticateStoreController');

// Login and register for boardgame stores

/**
 * @api {post} /panel/login StoreLogin
 * @apiName StoreLogin
 * @apiGroup Panel
 * @apiParam {String} email Store's email
* @apiParam {String} password Store's password
 * @apiSuccess {Object} response status code and token.
 * @apiError {Object} 400 invalid params
 */
router.post('/login', validation.validateStoreLoginParams, authenticateStoreController.loginStore);

/**
 * @api {post} /panel/register StoreRegister
 * @apiName StoreRegister
 * @apiGroup Panel
 * @apiParam {String} email Store's email
 * @apiParam {String} password Store's password
 * @apiParam {String} name Store's name
 * @apiParam {String} address Store's address
 * @apiSuccess {Object} response status code and token.
 * @apiError {Object} 400 invalid params
 */
router.post('/register', validation.validateStoreRegisterParams, authenticateStoreController.createStore);

module.exports = router;
