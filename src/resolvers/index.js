import productResolvers from "./product.js";
import categoryResolvers from "./category.js";
import orderResolvers from "./order.js";
import userResolvers from "./user.js";

export default {
  Query: {
    ...productResolvers.Query,
    ...categoryResolvers.Query,
    ...orderResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...productResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...userResolvers.Mutation
  }
};
