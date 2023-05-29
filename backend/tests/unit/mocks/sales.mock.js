const sales = [
  {
    saleId: 1,
    date: '2023-05-26T21:11:44.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-26T21:11:44.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-26T21:11:44.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleId = [
  {
    date: '2023-05-27T10:49:36.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-05-27T10:49:36.000Z',
    productId: 2,
    quantity: 10,
  },
];

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleResult = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = { 
  sales,
  saleId,
  newSale,
  newSaleResult,
};