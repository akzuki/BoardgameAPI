const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const productController = require('../../controllers/productController');

/**
 * @api {get} /api/product Retrieve products
 * @apiName GetAllProduct
 * @apiGroup User
 * @apiSuccess {Object} response status code and products.
 * @apiError {Object} 401 Unauthorized
 */
router.get('/', productController.getAllBoardgames);

/**
 * @api {get} /panel/product/:boardgameId Retrieve single product
 * @apiName GetProduct
 * @apiGroup User
 * @apiSuccess {Object} response status code and product.
 * @apiError {Object} 401 Unauthorized
 */
router.get('/:boardgameId', validation.validateBoardgameId, productController.getBoardgameById);


module.exports = router;
