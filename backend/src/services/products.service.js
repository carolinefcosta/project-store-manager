const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);
  if (!productId) return { type: 404, message: 'Product not found' };
  return { type: null, message: productId };
};

module.exports = {
  getAll,
  getById,
};