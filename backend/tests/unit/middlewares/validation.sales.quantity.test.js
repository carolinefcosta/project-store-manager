const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { ValidateSaleQuantity } = require('../../../src/middlewares/validation.sales.quantity');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando middleware validateSaleQuantity', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar uma venda com o campo quantity', function () {
    it('é chamado o status 400 e o json com a mensagem correta', async function () {
      const res = {};
      const req = {
        body: [{
          quantit: 1,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await ValidateSaleQuantity(req, res);
  
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({
         message: '"quantity" is required',
      });
    });

    it('é chamado o status 422 e o json com a msg correta', async function () {
      const res = {};
      const req = {
        body: [{
          quantity: 0,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await ValidateSaleQuantity(req, res);
  
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledWith({
         message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('é chamado o next', async function () {
      const res = {};
      const req = {
        body: [{
          quantity: 1,
        }],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const next = sinon.stub().returns();

      await ValidateSaleQuantity(req, res, next);
  
      expect(next).to.have.been.calledOnceWith();
    });
  });
});