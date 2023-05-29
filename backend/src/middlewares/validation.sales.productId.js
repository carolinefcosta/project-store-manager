const { productsModel } = require('../models');

const validateSaleProductId = async (req, res, next) => {
  // Auxílio do meu colega de turma Allysson;
  const saleProducts = req.body;
  const products = await productsModel.getAll();
  const productIds = products.map((product) => product.id);

  const saleId = saleProducts.every((sale) => sale.productId !== undefined);

  if (saleProducts.every((p) => p.productId > 0)
    && !saleProducts.every((p) => productIds
    .includes(p.productId))) return res.status(404).json({ message: 'Product not found' });

  if (!saleId) return res.status(400).json({ message: '"productId" is required' });
  
  return next();
};

module.exports = {
  validateSaleProductId,
};