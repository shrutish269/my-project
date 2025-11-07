import Category from "../models/Category.js";

export default {
  Query: {
    categories: async (_, { limit = 10, offset = 0 }) => {
      const totalCount = await Category.countDocuments();
      const edges = await Category.find().skip(offset).limit(limit);
      return { edges, totalCount };
    },
    category: (_, { id }) => Category.findById(id)
  },
  Mutation: {
    addCategory: (_, { input }) => Category.create(input),
    updateCategory: (_, { id, input }) => Category.findByIdAndUpdate(id, input, { new: true }),
    deleteCategory: async (_, { id }) => {
      await Category.findByIdAndDelete(id);
      return true;
    }
  }
};
