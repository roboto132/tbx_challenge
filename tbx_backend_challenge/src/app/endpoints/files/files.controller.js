const httpStatusCodes = require('http-status-codes');
const { filesService } = require('../../services');
const { parseCSVData } = require('../../mappers');

const getFiles = async (req, res, next) => {
  try {
    const fileNames = await filesService.getFileNames();

    async function downloadFile(fileName) {
      try {
          const response = await filesService.getFile(fileName);
          return { fileName, data: parseCSVData(response) };
      } catch (error) {
          return { fileName, error: error.message };
      }
    }

    async function downloadAllFiles() {
      const downloadPromises = fileNames.map(fileName => downloadFile(fileName));
      const results = await Promise.allSettled(downloadPromises);
      return results.map(result => result.status === 'fulfilled' ? result.value : { fileName: result.reason.fileName, error: result.reason.error });
    }

    const results = await downloadAllFiles();
  
    const filteredData = results
      .filter(({ data }) => data)
      .map(({ fileName, data }) => ({
        file: fileName,
        lines: data.lines.map(line => ({
          ...line,
        }))
      }));
  
    return res.status(httpStatusCodes.OK).send(filteredData);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getFiles,
};
