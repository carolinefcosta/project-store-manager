const ValidateSaleQuantity = async (req, res, next) => {
  const sales = req.body;

  const saleQuantity = sales.every((sale) => sale.quantity !== undefined);
  const saleQuantityNumber = sales.every((sale) => sale.quantity >= 1);

  if (!saleQuantity) {
    return res.status(400)
      .json({ message: '"quantity" is required' });
  }

  if (!saleQuantityNumber) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  ValidateSaleQuantity,
};