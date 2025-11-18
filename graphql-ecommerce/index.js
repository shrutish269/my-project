require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const createLoaders = require('./src/dataloaders');
const { getUserFromToken } = require('./src/utils/auth');
const { logger, requestId } = require('./src/utils/logger');
const config = require('./src/config');

async function startServer() {
  await mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  logger.info('✅ MongoDB Connected');

  const app = express();

  // Simple request id + logging middleware
  app.use((req, res, next) => {
    req.id = requestId();
    res.setHeader('x-request-id', req.id);
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';
      const tokenUser = await getUserFromToken(authHeader);
      // Attach loaders and models; models are via mongoose.model()
      return {
        user: tokenUser,
        loaders: createLoaders(),
        req,
        config
      };
    },
    formatError: (err) => {
      const e = {
        message: err.message,
        path: err.path,
        extensions: { ...(err.extensions || {}), code: err.extensions?.code || err.code || 'INTERNAL_ERROR' }
      };
      logger.error('GraphQL Error', e);
      return e;
    },
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = config.port;
  app.listen(PORT, () => logger.info(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`));
}

startServer().catch(err => {
  console.error(err);
  process.exit(1);
});
