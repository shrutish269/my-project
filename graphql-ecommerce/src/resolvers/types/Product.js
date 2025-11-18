module.exports = {
  id: (parent) => parent._id ? parent._id.toString() : parent.id,
  category: async (product, _, { loaders }) => {
    if (!product.categoryId) return null;
    return loaders.categoryLoader.load(product.categoryId.toString());
  },
  price: (product) => product.price
};