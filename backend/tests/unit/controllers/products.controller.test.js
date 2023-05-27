const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');

const { productsService } = require('../../../src/services');

const { products, productId } = require('../mocks/products.mock');

describe('Products Controller', function () {
  describe('Lista todos os produtos, testando função getAll()', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(products);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
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
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({ type: null, message: productId });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productId);
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      const res = {};
      const req = {
        params: {
          id: 999,
        },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({ type: 404, message: 'Product not found' });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});