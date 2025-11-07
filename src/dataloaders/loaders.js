import DataLoader from "dataloader";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const categoryLoader = new DataLoader(async (ids) => {
  const categories = await Category.find({ _id: { $in: ids } });
  return ids.map(id => categories.find(c => c._id.toString() === id.toString()));
});

export const productLoader = new DataLoader(async (ids) => {
  const products = await Product.find({ _id: { $in: ids } });
  return ids.map(id => products.find(p => p._id.toString() === id.toString()));
});
