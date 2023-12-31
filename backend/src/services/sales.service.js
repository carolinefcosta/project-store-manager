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
   // Auxilio do meu mentor Pablo, colega Allex e Raphael;
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