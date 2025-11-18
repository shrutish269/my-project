module.exports = {
  id: (order) => order._id ? order._id.toString() : order.id,
  user: async (order, _, { loaders }) => {
    return loaders.userLoader.load(order.userId.toString());
  },
  items: async (order, _, { loaders }) => {
    return Promise.all(order.items.map(async it => {
      const product = await loaders.productLoader.load(it.productId.toString());
      return {
        product,
        price: it.price,
        quantity: it.quantity
      };
    }));
  },
  total: (order) => order.total
};