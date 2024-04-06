const { requestClient } = require('../helpers');

const createError = require('http-errors');

const bearerToken = "aSuperSecretKey";

const getFileNames = async () => {
  try {
    const { files: filesName} = await requestClient.request(
      'secret/files',
      bearerToken,
      { method: 'GET' },
    );

    return filesName;
  } catch (error) {
    throw createError.BadGateway();
  }
};

const getFile = async (fileName) => {
  try {
    const data = await requestClient.request(
      `secret/file/${fileName}`,
      bearerToken,
      { method: 'GET' },
    );

    return data;
  } catch (error) {
    throw createError.BadGateway();
  }
};

module.exports = {
  getFileNames,
  getFile
};
