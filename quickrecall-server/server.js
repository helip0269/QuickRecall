const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const deckRoutes = require('./routes/deck');
const flashcardRoutes = require('./routes/flashcards');


require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('API running...'));

app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/flashcards', flashcardRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
