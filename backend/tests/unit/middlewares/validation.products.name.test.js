const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { validateProductName } = require('../../../src/middlewares/validation.products.name');

describe('Middleware validateName', function () {
  describe('Tentando adicionar um produto sem nome', function () {
    it('é chamado o status com o código 400 e o json com mensagem de erro', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const next = sinon.stub().returns();

      await validateProductName(req, res, next);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    // it('não deve chamar o próximo middleware', async function () {
    //   const res = {};
    //   const req = {
    //     body: {},
    //   };
    //   const next = sinon.stub().returns();

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await validateProductName(req, res, next);

    //   // eslint-disable-next-line no-unused-expressions
    //   expect(next).to.have.not.been.called;
    // });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Tentando adicionar um produto com nome menor de 5 caracteres', function () {
    it('é chamado o status com o código 422 e o json com mensagem de erro', async function () {
      const res = {};
      const req = {
        body: {
          name: 'abc',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const next = sinon.stub().returns();

      await validateProductName(req, res, next);

      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json)
        .to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    // it('não deve chamar o próximo middleware', async function () {
    //   const res = {};
    //   const req = {
    //     body: {},
    //   };

    //   const next = sinon.stub().returns();

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await validateProductName(req, res, next);

    //   // eslint-disable-next-line no-unused-expressions
    //   expect(next).to.have.not.been.called;
    // });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Inserindo dados corretos e chamando função next()', function () {
    it('é chamado o next', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Martelo',
        },
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const next = sinon.stub().returns();

      await validateProductName(req, res, next);
  
      expect(next).to.have.been.calledOnceWith();
    });
  });
});