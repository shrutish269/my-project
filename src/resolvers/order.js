import Order from "../models/Order.js";
import Product from "../models/Product.js";

export default {
  Query: {
    orders: (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return Order.find(user.role === "admin" ? {} : { user: user._id });
    },
    order: (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return Order.findById(id);
    }
  },
  Mutation: {
    placeOrder: async (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const products = await Product.find({ _id: { $in: input.productIds } });
      const total = products.reduce((sum, p) => sum + Number(p.price), 0);
      const order = await Order.create({ products, total, user: user._id, status: "Pending" });
      return order;
    },
    updateOrderStatus: async (_, { id, status }, { user }) => {
      if (!user || user.role !== "admin") throw new Error("Unauthorized");
      return Order.findByIdAndUpdate(id, { status }, { new: true });
    }
  }
};
