const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/students', studentRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});