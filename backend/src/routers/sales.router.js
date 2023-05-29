const express = require('express');

const { salesController } = require('../controllers');
const { validateSaleProductId } = require('../middlewares/validation.sales.productId');
const { ValidateSaleQuantity } = require('../middlewares/validation.sales.quantity');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', validateSaleProductId, ValidateSaleQuantity, salesController.insert);

module.exports = router;