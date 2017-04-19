const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');

const authenticateStoreController = require('../../controllers/authenticateStoreController');

// Login and register for boardgame stores
router.post('/login', validation.validateStoreLoginParams, authenticateStoreController.loginStore);
router.post('/register', validation.validateStoreRegisterParams, authenticateStoreController.createStore);

module.exports = router;
