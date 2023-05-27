const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId,
      s.date, 
      sp.product_id AS productId,
      sp.quantity 
      FROM sales s
      INNER JOIN sales_products sp
      ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id;`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, 
      sp.product_id AS productId,
      sp.quantity
      FROM sales s
      INNER JOIN sales_products sp
      ON sp.sale_id = s.id AND sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
};