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

const update = async (name, id) => {
  const updateProduct = await productsModel.update(name, id);
  if (!updateProduct) return { type: 404, message: 'Product not found' };
  return { type: null, message: { id, name } };
};

const remove = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  await productsModel.remove(id);
  return { type: null };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};