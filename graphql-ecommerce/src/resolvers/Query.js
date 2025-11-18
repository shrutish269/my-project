const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const { buildProjection } = require('../utils/projection');
const mongoose = require('mongoose');
const config = require('../config');

function buildFilter(filter) {
  if (!filter) return {};
  const q = {};
  const subFilters = [];

  if (filter.search) q.$text = { $search: filter.search };
  if (filter.categoryIds && filter.categoryIds.length) q.categoryId = { $in: filter.categoryIds.map(id => mongoose.Types.ObjectId(id)) };
  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    q.price = {};
    if (filter.minPrice !== undefined) q.price.$gte = filter.minPrice;
    if (filter.maxPrice !== undefined) q.price.$lte = filter.maxPrice;
  }
  if (filter.inStock !== undefined) q.inStock = filter.inStock;
  // attributes: direct match (simple)
  if (filter.attributes) {
    Object.keys(filter.attributes).forEach(k => {
      q[`attributes.${k}`] = filter.attributes[k];
    });
  }
  // AND / OR combinators
  if (filter.andFilters && filter.andFilters.length) {
    q.$and = filter.andFilters.map(f => buildFilter(f));
  }
  if (filter.orFilters && filter.orFilters.length) {
    q.$or = filter.orFilters.map(f => buildFilter(f));
  }
  return q;
}

module.exports = {
  categories: async () => Category.find({}).sort({ name: 1 }).lean(),

  category: async (_, { id }) => {
    return Category.findById(id).lean();
  },

  products: async (_, args, { loaders, config, req }, info) => {
    const { first = config.DEFAULT_PAGE_SIZE, offset = 0, filter, sort } = args;
    const limit = Math.min(first, config.MAX_PAGE_SIZE);
    const q = buildFilter(filter);

    // projection: use requested fields to only fetch needed fields
    const projection = buildProjection(info) || {};

    // sort
    let sortQ = { createdAt: -1 };
    if (sort && sort.field) {
      const dir = (sort.direction || 'DESC').toUpperCase() === 'ASC' ? 1 : -1;
      sortQ = { [sort.field]: dir };
    }

    // enforce server-side guard (prevent massive offset)
    if (offset > 100000) throw new UserInputError('Offset too large');

    const docs = await Product.find(q, projection).sort(sortQ).skip(Math.max(0, offset)).limit(limit).lean();
    const totalCount = await Product.countDocuments(q);

    return {
      totalCount,
      edges: docs.map(d => ({ node: d, cursor: d._id.toString() })),
      pageInfo: {
        hasNextPage: offset + docs.length < totalCount,
        endCursor: docs.length ? docs[docs.length - 1]._id.toString() : null
      }
    };
  },

  product: async (_, { id }, { loaders }) => {
    if (!id) return null;
    // use loader to benefit from batching
    return loaders.productLoader.load(id);
  },

  order: async (_, { id }, { user, loaders }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const order = await loaders.orderLoader.load(id);
    if (!order) return null;
    if (order.userId.toString() !== user.id && user.role !== 'ADMIN') throw new AuthenticationError('Not authorized');
    return order;
  },

  myOrders: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    return await Order.find({ userId: user.id }).sort({ createdAt: -1 }).lean();
  },

  me: async (_, __, { user, loaders }) => {
    if (!user) return null;
    return loaders.userLoader.load(user.id);
  },

  meCart: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const UserModel = require('../models/User');
    const usr = await UserModel.findById(user.id).populate({ path: 'cart.productId', model: 'Product' }).lean();
    return usr.cart.map(i => ({ product: i.productId, quantity: i.quantity }));
  }
};
