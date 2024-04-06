// test/fileMapper.test.js
const { expect } = require('chai');
const { parseCSVData } = require('../../app/mappers/file.mapper');

describe('File Mapper Tests', () => {
  it('should parse CSV data correctly', () => {
    const csvData = `file,Text,Number,Hex\n
                     test.csv,text1,123,4f5b8d790648534cee5a17f7101d3774\n
                     test.csv,text2,456,ea8d9e8428f153be05c822083f085be6\n`;

    const parsedData = parseCSVData(csvData);

    expect(parsedData.lines).to.have.lengthOf(2);

    const line1 = parsedData.lines[0];
    expect(line1.text).to.equal('text1');
    expect(line1.number).to.equal(123);
    expect(line1.hex).to.equal('4f5b8d790648534cee5a17f7101d3774');

    const line2 = parsedData.lines[1];
    expect(line2.text).to.equal('text2');
    expect(line2.number).to.equal(456);
    expect(line2.hex).to.equal('ea8d9e8428f153be05c822083f085be6');
  });

  it('should skip invalid CSV rows, wrong Hex format', () => {
    const csvData = `File,Text,Number,Hex\n
                     test.csv,text1,123,e32ce2d96a943ff78ec95fbb3c3f3cf3\n
                     test.csv,,456,invalidhex\n`;

    const parsedData = parseCSVData(csvData);
    expect(parsedData.lines).to.have.lengthOf(1);

    const line = parsedData.lines[0];
    expect(line.text).to.equal('text1');
    expect(line.number).to.equal(123);
    expect(line.hex).to.equal('e32ce2d96a943ff78ec95fbb3c3f3cf3');
  });

  it('should skip invalid CSV rows, wrong Number format', () => {
    const csvData = `File,Text,Number,Hex\n
                     test.csv,text1,123,e32ce2d96a943ff78ec95fbb3c3f3cf3\n
                     test.csv,,456A, 66afdf4a427e1f3be25722166d461810\n`;

    const parsedData = parseCSVData(csvData);
    expect(parsedData.lines).to.have.lengthOf(1);

    const line = parsedData.lines[0];
    expect(line.text).to.equal('text1');
    expect(line.number).to.equal(123);
    expect(line.hex).to.equal('e32ce2d96a943ff78ec95fbb3c3f3cf3');
  });
});
