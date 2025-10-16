const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transferRoutes = require('./routes/transfer');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/transfer', transferRoutes);

// 👇 This is the new route you added
app.post('/create-users', async (req, res) => {
  try {
    const users = await User.insertMany([
      { name: 'Alice', balance: 1000 },
      { name: 'Bob', balance: 500 }
    ]);
    res.status(201).json({ message: 'Users created', users });
  } catch (err) {
    res.status(500).json({ message: 'Error creating users', error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});