const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/ProductRoutes');
const product = require('./models/Product');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/productDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});