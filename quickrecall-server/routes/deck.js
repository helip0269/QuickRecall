const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');
const auth = require('../middleware/auth');

// Create Deck
router.post('/', auth, async (req, res) => {
  try {
    const newDeck = new Deck({
      name: req.body.name,
      description: req.body.description || '',
      userId: req.user.id
    });
    const saved = await newDeck.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get All Decks of Logged In User
router.get('/', auth, async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.user.id });
    res.json(decks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update Deck
router.put('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });
    res.json(deck);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// Delete Deck
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Deck.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ msg: 'Deck not found' });
    res.json({ msg: 'Deck deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
