const axios = require('axios');
const url = require('url');
const config = require('config');
const httpStatusCodes = require('http-status-codes');
const pjson = require('../../../package.json');

const errorPreview = (error) => ({
  error: {
    message: error.message,
    data: error.response?.data,
    path: error.config?.path,
    stack: error.stack
  }
});

const request = async (
  path,
  accessToken,
  options = { method: 'GET', timeout: 3000, throwOnNotFound: true },
  { headers = {}, service = 'files', ms = 'files-ms' } = {},
  { local = false, port = 3001 } = {}
) => {
  const host = url.format(config.get(`services.${service}.${ms}.url`));
  const defaultHeaders = {
    'user-agent': `${pjson.name} / ${pjson.version}`,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...headers
  };
  try {
    const { data = null } = await axios.request({
      url: `${local ? `http://localhost:${port}` : host}/${path}`,
      headers: defaultHeaders,
      ...options
    });

    return data;
  } catch (error) {
    if (
      !options.throwOnNotFound &&
      (error.response?.status === httpStatusCodes.NOT_FOUND ||
        error.status === httpStatusCodes.NOT_FOUND)
    ) {
      console.log(
        {
          ...errorPreview(error)
        },
        `Error while ${options.method} data on ${service}-${ms}:${error.message}`);
      return null;
    } else {
      console.error(
        {
          ...errorPreview(error)
        }, 'Error detected at api helper in tbx_backend_challenge');
      console.error(
        `Error while ${options.method} data on ${service}:${JSON.stringify({
          message: error.message,
          error
        })}`
      );
      throw error;
    }
  }
};

module.exports = {
  request,
  errorPreview
};
