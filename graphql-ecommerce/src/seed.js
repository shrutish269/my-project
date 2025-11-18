require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const config = require('./config');

async function seed() {
  try {
    await mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB. Seeding...");

    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Users
    await User.create({
      email: "admin@example.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "ADMIN",
      name: "Admin User",
      cart: []
    });
    await User.create({
      email: "user@example.com",
      password: await bcrypt.hash("customer", 10),
      role: "CUSTOMER",
      name: "Normal User",
      cart: []
    });

    // Categories
    const categories = await Category.insertMany([
      { name: "Electronics", slug: "electronics" }, { name: "Mobiles", slug: "mobiles" }, { name: "Laptops", slug: "laptops" },
      { name: "Fashion", slug: "fashion" }, { name: "Beauty", slug: "beauty" }, { name: "Home Appliances", slug: "home-appliances" },
      { name: "Sports", slug: "sports" }, { name: "Books", slug: "books" }, { name: "Furniture", slug: "furniture" }, { name: "Groceries", slug: "groceries" }
    ]);

    // Products (attach categoryId properly)
    await Product.insertMany([
      { name: "iPhone 15 Pro", slug: "iphone-15-pro", description: "Apple's latest", price: 1299, currency: "USD", inStock: true, quantity: 100, categoryId: categories[1]._id, attributes: { color: "Black", memory: "256GB" }, popularity: 95 },
      { name: "Samsung Galaxy S24", slug: "samsung-galaxy-s24", description: "Samsung flagship", price: 1099, currency: "USD", inStock: true, quantity: 150, categoryId: categories[1]._id, attributes: { color: "Phantom Black", memory: "128GB" }, popularity: 89 },
      { name: "MacBook Pro 16 M3", slug: "macbook-pro-16-m3", description: "Apple M3 Pro", price: 2499, currency: "USD", inStock: true, quantity: 80, categoryId: categories[2]._id, attributes: { ram: "16GB", storage: "1TB" }, popularity: 97 },
      { name: "HP Pavilion Gaming", slug: "hp-pavilion-gaming", description: "Gaming laptop", price: 999, currency: "USD", inStock: true, quantity: 60, categoryId: categories[2]._id, attributes: { gpu: "GTX 1650", ram: "8GB" }, popularity: 75 },
      { name: "Nike Air Max", slug: "nike-air-max", description: "Sports shoes", price: 149, currency: "USD", inStock: true, quantity: 200, categoryId: categories[6]._id, attributes: { color: "White", size: "UK 9" }, popularity: 82 },
      { name: "Adidas Hoodie", slug: "adidas-hoodie", description: "Winter hoodie", price: 89, currency: "USD", inStock: true, quantity: 300, categoryId: categories[3]._id, attributes: { size: "L", color: "Black" }, popularity: 70 },
      { name: "Nivea Skin Care Kit", slug: "nivea-skin-care-kit", description: "Skin care combo", price: 29, currency: "USD", inStock: true, quantity: 500, categoryId: categories[4]._id, attributes: { skinType: "All" }, popularity: 65 },
      { name: "Wooden Office Table", slug: "wooden-office-table", description: "Office desk", price: 350, currency: "USD", inStock: true, quantity: 40, categoryId: categories[8]._id, attributes: { material: "Solid Wood", size: "4ft" }, popularity: 77 },
      { name: "Electric Kettle 1.5L", slug: "electric-kettle", description: "Steel kettle", price: 25, currency: "USD", inStock: true, quantity: 180, categoryId: categories[5]._id, attributes: { capacity: "1.5L" }, popularity: 55 },
      { name: "Organic Rice 5kg", slug: "organic-rice-5kg", description: "Certified organic rice", price: 19, currency: "USD", inStock: true, quantity: 250, categoryId: categories[9]._id, attributes: { weight: "5kg" }, popularity: 60 }
    ]);

    console.log("🌱 Seeding complete!\nAdmin: admin@example.com / adminpass\nUser: user@example.com / customer");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
