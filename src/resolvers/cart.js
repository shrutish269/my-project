import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { AppError } from "../utils/errors.js";

export default {
  Query: {
    cart: async (_, __, { user }) => {
      if (!user) throw new AppError("Unauthorized", "401");
      return Cart.findOne({ user: user._id }).populate("items.product");
    }
  },
  Mutation: {
    addToCart: async (_, { productId, quantity = 1 }, { user }) => {
      if (!user) throw new AppError("Unauthorized", "401");
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) cart = await Cart.create({ user: user._id, items: [] });

      const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
      return cart.populate("items.product");
    },
    removeFromCart: async (_, { productId }, { user }) => {
      if (!user) throw new AppError("Unauthorized", "401");
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) throw new AppError("Cart is empty", "400");
      cart.items = cart.items.filter(i => i.product.toString() !== productId);
      await cart.save();
      return cart.populate("items.product");
    },
    clearCart: async (_, __, { user }) => {
      if (!user) throw new AppError("Unauthorized", "401");
      await Cart.findOneAndDelete({ user: user._id });
      return true;
    },
    checkout: async (_, __, { user }) => {
      if (!user) throw new AppError("Unauthorized", "401");
      const cart = await Cart.findOne({ user: user._id }).populate("items.product");
      if (!cart || !cart.items.length) throw new AppError("Cart is empty", "400");
      const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const order = await Order.create({
        user: user._id,
        products: cart.items.map(i => i.product),
        total
      });
      await cart.remove();
      return order;
    }
  }
};
