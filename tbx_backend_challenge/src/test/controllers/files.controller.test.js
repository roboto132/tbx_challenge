const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const controller = require('../../app/endpoints/files/files.controller');
const filesService = require('../../app/services/files.service');
const { parseCSVData } = require('../../app/mappers/file.mapper');

describe('Controller Tests', () => {
  describe('getFiles', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should return filtered data for files', async () => {
      sinon.stub(filesService, 'getFileNames').resolves(['test1.csv', 'test2.csv']);
      sinon.stub(filesService, 'getFile').callsFake(async (fileName) => `File,Text,Number,Hex\n${fileName},text1,123,e32ce2d96a943ff78ec95fbb3c3f3cf3\n`);


      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await controller.getFiles(req, res, next);

      expect(res.statusCode).to.equal(200);

      const result = res._getData();

      const expectedResults = [
        {
          file: 'test1.csv',
          lines: [
            {
              text: 'text1',
              number: 123,
              hex: 'e32ce2d96a943ff78ec95fbb3c3f3cf3'
            }
          ]
        },
        {
          file: 'test2.csv',
          lines: [
            {
              text: 'text1',
              number: 123,
              hex: 'e32ce2d96a943ff78ec95fbb3c3f3cf3'
            }
          ]
        }
      ];

      for (let i = 0; i < expectedResults.length; i++) {
        expect(result[i].file).to.equal(expectedResults[i].file);
        expect(result[i].lines.length).to.equal(expectedResults[i].lines.length);

        for (let j = 0; j < expectedResults[i].lines.length; j++) {
          expect(result[i].lines[j].text).to.equal(expectedResults[i].lines[j].text);
          expect(result[i].lines[j].number).to.equal(expectedResults[i].lines[j].number);
          expect(result[i].lines[j].hex).to.equal(expectedResults[i].lines[j].hex);
        }
      }
    });
    it('should handle errors from getFileNames', async () => {
      sinon.stub(filesService, 'getFileNames').rejects(new Error('getFileNames error'));

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await controller.getFiles(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.firstCall.args[0]).to.be.an.instanceOf(Error);
      expect(next.firstCall.args[0].message).to.equal('getFileNames error');
    });
  });
});
