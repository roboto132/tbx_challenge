const httpStatusCodes = require('http-status-codes');
const { errors } = require('../helpers');

const joiValidationError = (err, _, res, next) => {
  if (err.error && err.error.isJoi && err.error.details) {
    const validationMessage = err.error.details
      .map((detail) => `${detail.message}`)
      .join(' | ');

    console.error(validationMessage);

    return error.handleError(
      {
        statusCode: httpStatusCodes.BAD_REQUEST,
        message: 'Bad request',
      },
      res,
    );
  }
  return next(err);
};

module.exports = { joiValidationError };
