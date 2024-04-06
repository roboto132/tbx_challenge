const express = require('express');
const filesRoutes = require('./files/files.route');

const router = express.Router();

router.use('/', filesRoutes);

module.exports = router;
