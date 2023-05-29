const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { validateSaleProductId } = require('../../../src/middlewares/validation.sales.productId');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando middleware validateSaleProductId', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar uma venda com o campo id e productId', function () {
    it('é chamado o status 400 e o json com a mensagem correta', async function () {
      const res = {};
      const req = {
        body: [{
          productI: 1,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await validateSaleProductId(req, res);
  
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({
         message: '"productId" is required',
      });
    });

    it('é chamado o status 404 e o json com a msg correta', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 999,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await validateSaleProductId(req, res);
  
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledWith({
         message: 'Product not found',
      });
    });

    it('é chamado o next', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 1,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const next = sinon.stub().returns();

      await validateSaleProductId(req, res, next);
  
      expect(next).to.have.been.calledOnceWith();
    });
  });
});