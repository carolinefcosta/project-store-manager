const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');

const { salesService } = require('../../../src/services');

const { saleId, sales } = require('../mocks/sales.mock');

describe('Sales Controller', function () {
  describe('Lista todas as vendas, testando função getAll()', function () {
    it('com sucesso', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(sales);

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
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

      sinon.stub(salesService, 'getById').resolves({ type: null, message: saleId });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleId);
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

      sinon.stub(salesService, 'getById').resolves({ type: 404, message: 'Sale not found' });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});