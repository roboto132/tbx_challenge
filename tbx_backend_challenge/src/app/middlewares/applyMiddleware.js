const { json: expressJson } = require('express');
const cors = require('cors');
require('express-async-errors');
const { joiValidationError } = require('./joiValidationError');
const routes = require('../endpoints');

const applyMiddleware = (app) => {
  // Enable cors
  app.use(cors());
  // parse body to json
  app.use(expressJson());

  // Routes
  app.use('/', routes);

  // Joi middleware
  app.use(joiValidationError);
};

module.exports = { applyMiddleware };
