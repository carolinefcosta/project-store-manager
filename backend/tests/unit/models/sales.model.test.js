const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');

const { sales, saleId } = require('../mocks/sales.mock');

describe('Sales Model', function () {
  describe('Lista todas vendas, testando função getAll()', function () {
    it('com o tipo array', async function () {
      const result = await salesModel.getAll();

      expect(result).to.be.a('array');
    });

    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);

      const result = await salesModel.getAll();

      expect(result).to.deep.equal(sales);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Lista a venda pelo seu id, testando função getById()', function () {
    const prodId = 1;

    it('Lista produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[saleId]]);

      const result = await salesModel.getById(prodId);

      expect(result).to.deep.equal(saleId);
    });
  });
});