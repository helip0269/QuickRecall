const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}
, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema);
