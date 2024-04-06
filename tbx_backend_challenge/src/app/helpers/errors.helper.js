const httpStatusCodes = require('http-status-codes');

class HttpError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (error, res) => {
  const { statusCode, message } = error;

  res.status(statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR).send({
    statusCode,
    message,
  });
};

module.exports = {
  handleError,
  HttpError,
};
