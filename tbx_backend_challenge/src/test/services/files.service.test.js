const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const sinon = require('sinon');
const createError = require('http-errors');
const { getFileNames, getFile } = require('../../app/services/files.service');
const { requestClient } = require('../../app/helpers');

describe('File Service Tests', () => {
  describe('getFileNames', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should return file names', async () => {
      sinon.stub(requestClient, 'request').resolves({ files: ['file1.csv', 'file2.csv'] });

      const result = await getFileNames();

      expect(result).to.deep.equal(['file1.csv', 'file2.csv']);
    });

    it('should throw error on request failure', async () => {
      sinon.stub(requestClient, 'request').rejects(new Error('Request error'));

      await expect(getFileNames()).to.be.rejectedWith(createError.BadGateway);
    });
  });

  describe('getFile', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return file data', async () => {
      sinon.stub(requestClient, 'request').resolves('file data');
  
      const result = await getFile('file1.csv');
  
      expect(result).to.equal('file data');
    });
  
    it('should throw error on request failure', async () => {
      sinon.stub(requestClient, 'request').rejects(new Error('Request error'));
  
      await expect(getFile('file1.csv')).to.be.rejectedWith(createError.BadGateway);
    });
  });
  
});
