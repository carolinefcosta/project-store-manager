const sinon = require('sinon');
const { expect } = require('chai');

const { salesModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');

const { sales, saleId } = require('../mocks/sales.mock');

describe('Sales Service', function () {
  describe('Lista todas as vendas, testando função getAll()', function () {
    it('com o tipo array', async function () {
      const result = await salesService.getAll();

      expect(result).to.be.a('array');
    });

    it('com sucesso', async function () {
      sinon.stub(salesModel, 'getAll').resolves(sales);

      const result = await salesService.getAll();

      expect(result).to.deep.equal(sales);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Lista a venda pelo seu id, testando função getById()', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('retorna a venda caso ID seja existente', async function () {
      sinon.stub(salesModel, 'getById').resolves(saleId);
      
      const result = await salesService.getById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleId);
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      sinon.stub(salesModel, 'getById').resolves(undefined);
      
      const result = await salesService.getById(999);

      expect(result.type).to.equal(404);
      expect(result.message).to.deep.equal('Sale not found');
    });
  });
});