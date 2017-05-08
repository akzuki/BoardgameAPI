const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');

const productController = require('../../controllers/productController');
const upload = require('../../middlewares/uploadPhoto-multer');

/**
 * @api {post} /panel/product Add new product
 * @apiName AddProduct
 * @apiGroup Panel
 * @apiHeader {String} Authorization store's token
 * @apiParam {String} photoUrl photo url of product
 * @apiParam {String} title product name
 * @apiParam {String} description product description
 * @apiParam {String} player number of players
 * @apiParam {String} time time to play
 * @apiParam {String} ages limit age to play
 * @apiParam {Float} price price
 * @apiSuccess {Object} response status code and message.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
router.post('/', validation.validateCreateBoardgameParams, productController.createBoardgame);

/**
 * @api {get} /panel/product Retrieve products
 * @apiName GetProduct
 * @apiGroup Panel
 * @apiHeader {String} Authorization store's token
 * @apiSuccess {Object} response status code and products.
 * @apiError {Object} 401 Unauthorized
 */
router.get('/', productController.getBoardgamesByStoreId);

/**
 * @api {delete} /panel/product Delete product
 * @apiName DeleteProduct
 * @apiGroup Panel
 * @apiHeader {String} Authorization store's token
 * @apiParam {String} boardgameId id of product to delete
 * @apiSuccess {Object} response status code and message.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
router.delete('/', validation.validateDeleteBoardgameParams, productController.deleteBoardgameById);

/**
 * @api {post} /panel/product/photo Upload product photo
 * @apiName UploadProductPhoto
 * @apiGroup Panel
 * @apiHeader {String} Authorization store's token
 * @apiParam {File} photo product photo
 * @apiSuccess {Object} response status code and photo path.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
router.post('/photo', upload.single('photo'), productController.uploadBoardgamePhoto);

/**
 * @api {put} /panel/product/:boardgameId Update product
 * @apiName UpdateProduct
 * @apiGroup Panel
 * @apiHeader {String} Authorization store's token
 * @apiParam {String} photoUrl photo url of product
 * @apiParam {String} title product name
 * @apiParam {String} description product description
 * @apiParam {String} player number of players
 * @apiParam {String} time time to play
 * @apiParam {String} ages limit age to play
 * @apiParam {Float} price price
 * @apiSuccess {Object} response status code and message.
 * @apiError {Object} 400 invalid params
 * @apiError {Object} 401 Unauthorized
 */
router.put('/:boardgameId', validation.validateBoardgameId, productController.updateBoardgame);

module.exports = router;
