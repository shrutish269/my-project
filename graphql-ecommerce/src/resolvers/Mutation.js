const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server-errors');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

module.exports = {
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new UserInputError('User not found');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UserInputError('Incorrect password');
    return jwt.sign({ sub: user._id.toString(), role: user.role }, config.JWT_SECRET, { expiresIn: '7d' });
  },

  addToCart: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const { productId, quantity } = input;
    const product = await Product.findById(productId);
    if (!product) throw new UserInputError('Product not found');
    const usr = await User.findById(user.id);
    const existing = usr.cart.find(i => i.productId.toString() === productId.toString());
    if (existing) existing.quantity += quantity; else usr.cart.push({ productId, quantity });
    await usr.save();
    const saved = usr.cart.find(i => i.productId.toString() === productId.toString());
    const productDoc = await Product.findById(saved.productId).lean();
    return { product: productDoc, quantity: saved.quantity };
  },

  updateCartItem: async (_, { input }, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const { productId, quantity } = input;
    const usr = await User.findById(user.id);
    const idx = usr.cart.findIndex(i => i.productId.toString() === productId);
    if (idx === -1) throw new UserInputError('Product not in cart');
    if (quantity <= 0) {
      usr.cart.splice(idx, 1);
      await usr.save();
      return null;
    }
    usr.cart[idx].quantity = quantity;
    await usr.save();
    const saved = usr.cart.find(i => i.productId.toString() === productId);
    const productDoc = await Product.findById(saved.productId).lean();
    return { product: productDoc, quantity: saved.quantity };
  },

  removeFromCart: async (_, { productId }, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const usr = await User.findById(user.id);
    usr.cart = usr.cart.filter(i => i.productId.toString() !== productId.toString());
    await usr.save();
    return true;
  },

  createProduct: async (_, { input }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    const p = await Product.create({
      name: input.name,
      slug: input.slug,
      description: input.description,
      price: input.price,
      currency: input.currency || 'USD',
      quantity: input.quantity,
      inStock: input.quantity > 0,
      categoryId: input.categoryId || null,
      attributes: input.attributes || {},
      popularity: input.popularity || 0
    });
    return p;
  },

  updateProduct: async (_, { id, input }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    const p = await Product.findById(id);
    if (!p) throw new UserInputError('Product not found');
    Object.assign(p, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      price: input.price,
      currency: input.currency || p.currency,
      quantity: input.quantity,
      inStock: input.quantity > 0,
      categoryId: input.categoryId || p.categoryId,
      attributes: input.attributes || p.attributes,
      popularity: input.popularity || p.popularity
    });
    await p.save();
    return p;
  },

  deleteProduct: async (_, { id }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    const res = await Product.deleteOne({ _id: id });
    return res.deletedCount === 1;
  },

  createCategory: async (_, { name, slug }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    return await Category.create({ name, slug });
  },

  updateCategory: async (_, { id, name, slug }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    const c = await Category.findById(id);
    if (!c) throw new UserInputError('Category not found');
    c.name = name;
    c.slug = slug;
    await c.save();
    return c;
  },

  deleteCategory: async (_, { id }, { user }) => {
    if (!user || user.role !== 'ADMIN') throw new ForbiddenError('Not authorized');
    const res = await Category.deleteOne({ _id: id });
    return res.deletedCount === 1;
  },

  placeOrder: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    const usr = await User.findById(user.id).populate({ path: 'cart.productId', model: 'Product' });
    if (!usr.cart.length) throw new UserInputError('Cart is empty');
    let total = 0;
    const items = [];
    for (const ci of usr.cart) {
      const prod = ci.productId;
      if (!prod) throw new UserInputError('Product missing');
      if (!prod.inStock || prod.quantity < ci.quantity) throw new UserInputError(`Insufficient stock for ${prod.name}`);
      items.push({ productId: prod._id, name: prod.name, price: prod.price, quantity: ci.quantity });
      total += prod.price * ci.quantity;
      prod.quantity -= ci.quantity;
      prod.inStock = prod.quantity > 0;
      await prod.save();
    }
    const order = await Order.create({ userId: usr._id, items, total, status: 'PLACED' });
    usr.cart = [];
    await usr.save();
    return await Order.findById(order._id).lean();
  },

  updateOrderStatus: async (_, { id, status }, { user }) => {
    if (!user) throw new AuthenticationError('Not authenticated');
    if (user.role !== 'ADMIN') throw new ForbiddenError('Admin only');
    const order = await Order.findById(id);
    if (!order) throw new UserInputError('Order not found');
    order.status = status;
    await order.save();
    return order;
  }
};
