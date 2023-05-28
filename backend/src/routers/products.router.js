const express = require('express');

const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/validation.products.name');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', validateProductName, productsController.insert);

router.put('/:id', validateProductName, productsController.update);

module.exports = router;