function parseCSVData(csvData) {
  const lines = csvData.split('\n');
  const parsedData = {
    lines: []
  };

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',');

    if (columns.length === 4) {
      const text = columns[1].trim();
      const numberString = columns[2].trim();
      const hex = columns[3].trim();
      const number = parseInt(columns[2].trim());

      if (typeof text === 'string' && text.length > 0 && isValidHex(hex) && containsOnlyDigits(numberString) && !isNaN(number)) {
        parsedData.lines.push({ text, number, hex });
      }
    }
  }

  return parsedData;
}

function containsOnlyDigits(str) {
  return /^\d+$/.test(str);
}

function isValidHex(hex) {
  return /^[0-9a-fA-F]{32}$/.test(hex);
}


module.exports = {
  parseCSVData,
};
