const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.insert(name);
  // if (type) return res.status(type).json(message);
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update(name, Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type } = await productsService.remove(Number(id));
  if (type) return res.status(type);
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};