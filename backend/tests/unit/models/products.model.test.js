const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { products, productId,
} = require('../mocks/products.mock');

describe('Products Model', function () {
  describe('Lista todos os produtos, testando função getAll()', function () {
    it('com o tipo array', async function () {
      const result = await productsModel.getAll();

      expect(result).to.be.a('array');
    });

    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.getAll();

      expect(result).to.deep.equal(products);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Lista o produto pelo seu id, testando função getById()', function () {
    const prodId = 1;

    it('Lista produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[productId]]);

      const result = await productsModel.getById(prodId);

      expect(result).to.deep.equal(productId);
    });
  });

  // describe('Cadastra um novo produto', function () {
  //   afterEach(function () {
  //     sinon.restore();
  //   });

  //   const expected = 1;

  //   it('com sucesso', async function () {
  //     const execute = [{ insertId: 1 }];

  //     sinon.stub(connection, 'execute').resolves(execute);

  //     const response = await productsModel.insert(insertProduct);

  //     expect(response).to.equal(expected);
  //   });
  // });
});