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

const insert = async (name) => {
  const newProduct = await productsModel.insert(name);
  
  const newProductId = await productsModel.getById(newProduct);

  return { type: null, message: newProductId };
};

module.exports = {
  getAll,
  getById,
  insert,
};