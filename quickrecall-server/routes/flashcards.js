
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const flashcardCtrl = require('../controllers/flashcardController');

// Flashcard CRUD routes
router.post('/:deckId', auth, flashcardCtrl.createFlashcard);
router.get('/:deckId', auth, flashcardCtrl.getFlashcards);
router.put('/:id', auth, flashcardCtrl.updateFlashcard);
router.delete('/:id', auth, flashcardCtrl.deleteFlashcard);

module.exports = router;
