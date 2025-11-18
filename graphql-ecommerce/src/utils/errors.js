const { ApolloError } = require('apollo-server-express');

function createError(message, code = 'INTERNAL_ERROR', details = {}) {
  return new ApolloError(message, code, details);
}

module.exports = { createError };
