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

module.exports = {
  getAll,
  getById,
};