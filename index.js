// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (playing cards)
let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
];

// Routes
app.get('/cards', (req, res) => {
  res.json(cards);
});

app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  const newCard = { id: cards.length + 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cards = cards.filter(c => c.id !== id);
  res.json({ message: 'Card deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Playing Cards API listening at http://localhost:${PORT}`);
});
