const { v4: uuidv4 } = require('uuid');

function requestId() { return uuidv4(); }

const logger = {
  info: (...args) => console.log('[info]', ...args),
  error: (...args) => console.error('[error]', ...args),
  debug: (...args) => console.debug('[debug]', ...args)
};

module.exports = { logger, requestId };
