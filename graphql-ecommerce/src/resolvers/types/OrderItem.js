module.exports = {
  product: async (orderItem, _, { loaders }) => {
    return loaders.productLoader.load(orderItem.productId.toString());
  }
};
