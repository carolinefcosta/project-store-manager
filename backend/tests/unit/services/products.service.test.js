const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');

const { products, productId } = require('../mocks/products.mock');

describe('Products Service', function () {
  describe('Lista todos os produtos, testando função getAll()', function () {
    it('com o tipo array', async function () {
      const result = await productsService.getAll();

      expect(result).to.be.a('array');
    });

    it('com sucesso', async function () {
      sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await productsService.getAll();

      expect(result).to.deep.equal(products);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Lista o produto pelo seu id, testando função getById()', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('retorna a pessoa passageira caso ID existente', async function () {
      sinon.stub(productsModel, 'getById').resolves(productId[0]);
      
      const result = await productsService.getById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productId[0]);
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      
      const result = await productsService.getById(999);

      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Product not found');
    });
  });
});