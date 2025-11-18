module.exports = {
  product: async (cartItem, _, { loaders }) => {
    if (cartItem.product && cartItem.product._id) return cartItem.product;
    return loaders.productLoader.load(cartItem.productId.toString());
  }
};
