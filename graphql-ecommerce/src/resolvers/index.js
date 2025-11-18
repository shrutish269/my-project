const { DateTime, JSON } = require('../scalars');
const Query = require('./Query');
const Mutation = require('./Mutation');

module.exports = {
  DateTime,
  JSON,
  Query,
  Mutation,

  Product: require('./types/Product'),
  Category: require('./types/Category'),
  Order: require('./types/Order'),
  User: require('./types/User'),
  CartItem: require('./types/CartItem'),
  OrderItem: require('./types/OrderItem')
};
