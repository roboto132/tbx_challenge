const config = require('config');
const process = require('process');
const packageInfo = require('../../package.json');

// Get from config
const timeout = config.get('killTimeout');

// On server internal error.
const onServerError = () => {
  console.log('SERVER ERROR');
};

// On server start.
const onListen = (port) => {
  console.log('tbx_backend_challenge');
  console.log(
    {
      type: 'application_start',
      applicationName: packageInfo.name,
      port,
      env: 'develop',
    },
    `Application ${packageInfo.name} started at port ${port}`);
};

// When the process receive kill signal.
const onProcessKill = (server) => () => {
  console.log('Service termination signal received');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Finishing server');
      return server.close(() => process.exit(0));
    }, timeout).then(resolve());
  });
};

// When in the server happen a uncaugth exception.
const onException = (err) => {
  console.error(err);
};

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};
