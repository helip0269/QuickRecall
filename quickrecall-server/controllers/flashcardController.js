const Flashcard = require('../models/Flashcard');

// Create
exports.createFlashcard = async (req, res) => {
  try {
    const { front, back } = req.body;
    const deckId = req.params.deckId;
    const userId = req.user.id; 

    const newFlashcard = new Flashcard({
      front,
      back,
      deckId,
      userId
    });

    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (err) {
    console.error('Flashcard creation failed:', err);
    res.status(500).json({ msg: err.message });
  }
};

// Get by deck
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ deckId: req.params.deckId });
    res.json(flashcards);
  } catch (err) {
    console.error('Failed to fetch flashcards:', err);
    res.status(500).json({ msg: err.message });
  }
};


// Update
exports.updateFlashcard = async (req, res) => {
  try {
    const updated = await Flashcard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete
exports.deleteFlashcard = async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
