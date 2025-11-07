import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/graphql-ecommerce";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const categories = await Category.insertMany([
      { name: "Electronics", description: "Gadgets" },
      { name: "Books", description: "Reading material" },
      { name: "Clothing", description: "Wearables" },
      { name: "Sports", description: "Sports stuff" },
      { name: "Toys", description: "Kids toys" },
      { name: "Furniture", description: "Home furniture" },
      { name: "Beauty", description: "Cosmetics" },
      { name: "Music", description: "Instruments" },
      { name: "Automobile", description: "Vehicle parts" },
      { name: "Food", description: "Groceries" }
    ]);

    const products = await Product.insertMany(
      categories.map((c, i) => ({
        name: `${c.name} Product ${i + 1}`,
        description: `Description for ${c.name} Product ${i + 1}`,
        price: (i + 1) * 10,
        inStock: true,
        category: c._id
      }))
    );

    const user = await User.create({ username: "admin", email: "admin@test.com", password: "admin123", role: "admin" });

    console.log("🎉 Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during seeding:", err);
    process.exit(1);
  }
}

seedDatabase();
