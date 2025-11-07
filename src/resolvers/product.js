import Product from "../models/Product.js";
import Category from "../models/Category.js";

export default {
  Query: {
    products: async (_, { filter, sort, limit = 10, offset = 0 }) => {
      const query = {};
      if (filter) {
        if (filter.categoryIds) query.category = { $in: filter.categoryIds };
        if (filter.inStock !== undefined) query.inStock = filter.inStock;
        if (filter.priceMin !== undefined || filter.priceMax !== undefined) {
          query.price = {};
          if (filter.priceMin !== undefined) query.price.$gte = filter.priceMin;
          if (filter.priceMax !== undefined) query.price.$lte = filter.priceMax;
        }
        if (filter.search) {
          query.$text = { $search: filter.search };
        }
      }

      const sortObj = {};
      if (sort) sortObj[sort.field] = sort.order;

      const totalCount = await Product.countDocuments(query);
      const edges = await Product.find(query).sort(sortObj).skip(offset).limit(limit);
      return { edges, totalCount };
    },
    product: (_, { id }) => Product.findById(id)
  },
  Mutation: {
    addProduct: async (_, { input }) => {
      const category = await Category.findById(input.categoryId);
      if (!category) throw new Error("Category not found");
      const product = await Product.create({ ...input, category });
      return product;
    },
    updateProduct: async (_, { id, input }) => {
      return Product.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return true;
    }
  }
};
