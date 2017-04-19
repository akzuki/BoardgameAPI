const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const productController = require('../../controllers/productController');

router.get('/', productController.getAllBoardgames);
router.get('/:boardgameId', validation.validateBoardgameId, productController.getBoardgameById);


module.exports = router;
