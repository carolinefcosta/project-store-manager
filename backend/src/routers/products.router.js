const express = require('express');

const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validation.products');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', validateProductName, productsController.insert);

module.exports = router;