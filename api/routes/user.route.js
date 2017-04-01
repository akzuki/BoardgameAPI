const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router.post('/login', userController.login);

module.exports = router;
