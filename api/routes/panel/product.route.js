const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');

const productController = require('../../controllers/productController');
const upload = require('../../middlewares/uploadPhoto-multer');

router.post('/', validation.validateCreateBoardgameParams, productController.createBoardgame);
router.get('/', productController.getBoardgamesByStoreId);
router.delete('/', validation.validateDeleteBoardgameParams, productController.deleteBoardgameById);
router.post('/photo', upload.single('photo'), productController.uploadBoardgamePhoto);
router.put('/:boardgameId', validation.validateBoardgameId, productController.updateBoardgame);

module.exports = router;
