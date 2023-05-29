const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const insert = async (req, res) => {
   // Auxilio do meu mentor Pablo e colega Allex;
  const saleProducts = req.body;
  const { type, message } = await salesService.insert(saleProducts);
  if (!type) return res.status(201).json(message);
 
  return res.status(type).json({ message });
};

module.exports = {
  getAll,
  getById,
  insert,
};