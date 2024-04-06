const http = require('http');
const express = require('express');
require('express-async-errors');
const config = require('config');
const events = require('./events');
const { applyMiddleware } = require('./middlewares');

// init server
const app = express();
const server = http.createServer(app);

// apply midlewares
applyMiddleware(app);

const port = config.get('port') || 3000;

// define server event to handle or unhandle process.
server.on('error', events.onServerError);
process.on('SIGINT', events.onProcessKill(server));
process.on('SIGTERM', events.onProcessKill(server));
process.on('unhandledRejection', events.onException);
process.on('uncaughtException', events.onException);

module.exports = app.listen(port, () => events.onListen(port));
