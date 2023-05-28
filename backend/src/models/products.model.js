const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM products
      ORDER BY id;`,
  );
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM products WHERE id = ?
      ORDER BY id;`,
    [id],
  );
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (name, id) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows;
};

const remove = async (id) => {
  const deleteProduct = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return deleteProduct;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};