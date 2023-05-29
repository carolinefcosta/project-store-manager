const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');

const { sales, saleId, newSale, newSaleResult } = require('../mocks/sales.mock');

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
  });

  describe('Lista a venda pelo seu id, testando função getById()', function () {
    const prodId = 1;

    it('Lista produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([saleId]);

      const result = await salesModel.getById(prodId);

      expect(result).to.be.deep.equal(saleId);
    });
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('Cadastrando uma nova venda, testando função insert()', function () {
    it('Cadastrando uma nova venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insert(newSale);
      expect(result).to.equal(1);
    });
  
    it('Retorno esperado de uma nova venda', async function () {
      const insertId = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(insertId);
      const result = await salesModel.insert(newSale);
      expect(result).to.deep.equal(newSaleResult);
    });
  });
});