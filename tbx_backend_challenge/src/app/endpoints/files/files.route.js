const express = require('express');
const filesController = require('./files.controller');

const router = express.Router();

router
  .route('/files/data')
  .get(filesController.getFiles);

module.exports = router;
