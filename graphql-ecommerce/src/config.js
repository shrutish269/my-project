require('dotenv').config();
module.exports = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/graphql-ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  port: parseInt(process.env.PORT || '4000', 10),
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE || '20', 10),
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE || '100', 10)
};
