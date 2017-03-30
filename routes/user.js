const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

module.exports = router;
