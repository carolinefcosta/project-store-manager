const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};