const DataLoader = require('dataloader');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Order = require('../models/Order');

function createLoaders() {
  return {
    productLoader: new DataLoader(async (keys) => {
      const docs = await Product.find({ _id: { $in: keys } }).lean();
      const map = new Map(docs.map(d => [d._id.toString(), d]));
      return keys.map(k => map.get(k.toString()) || null);
    }, { cacheKeyFn: key => key.toString() }),

    categoryLoader: new DataLoader(async (keys) => {
      const docs = await Category.find({ _id: { $in: keys } }).lean();
      const map = new Map(docs.map(d => [d._id.toString(), d]));
      return keys.map(k => map.get(k.toString()) || null);
    }, { cacheKeyFn: key => key.toString() }),

    userLoader: new DataLoader(async (keys) => {
      const docs = await User.find({ _id: { $in: keys } }).lean();
      const map = new Map(docs.map(d => [d._id.toString(), d]));
      return keys.map(k => map.get(k.toString()) || null);
    }, { cacheKeyFn: key => key.toString() }),

    orderLoader: new DataLoader(async (keys) => {
      const docs = await Order.find({ _id: { $in: keys } }).lean();
      const map = new Map(docs.map(d => [d._id.toString(), d]));
      return keys.map(k => map.get(k.toString()) || null);
    }, { cacheKeyFn: key => key.toString() }),
  };
}

module.exports = createLoaders;
