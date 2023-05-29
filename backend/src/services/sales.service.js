const { salesModel } = require('../models');

const getAll = async () => {
  const products = await salesModel.getAll();
  return products;
};

const getById = async (id) => {
  const saleId = await salesModel.getById(id);
  if (saleId.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: saleId };
};

const insert = async (sale) => {
   // Auxilio do meu mentor Pablo e colega Allex;
  // const products = await Promise.all(sale.map(({ productId }) => salesModel.getById(productId)));
  // if (products.includes(undefined)) return { type: 404, message: 'Product not found' };
  const newSale = await salesModel.insert(sale);
  return { type: null,
  message: {
    id: newSale,
    itemsSold: sale,
  } };
};

module.exports = {
  getAll,
  getById,
  insert,
};