const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const Deck = mongoose.model('Deck', deckSchema)

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }
    const decks = await Deck.find({ userId })
    res.json(decks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const deck = new Deck({
      title: req.body.title,
      description: req.body.description || '',
      userId: req.body.userId
    })
    const newDeck = await deck.save()
    res.status(201).json(newDeck)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

const flashcardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  deckId: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema)

router.get('/:deckId/cards', async (req, res) => {
  try {
    const cards = await Flashcard.find({ deckId: req.params.deckId })
    res.json(cards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/:deckId/cards', async (req, res) => {
  try {
    const flashcard = new Flashcard({
      front: req.body.front,
      back: req.body.back,
      deckId: req.params.deckId
    })
    const newFlashcard = await flashcard.save()
    res.status(201).json(newFlashcard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id)
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' })
    }
    res.json(deck)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id)
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' })
    }
    
    if (req.body.title != null) {
      deck.title = req.body.title
    }
    if (req.body.description != null) {
      deck.description = req.body.description
    }
    
    const updatedDeck = await deck.save()
    res.json(updatedDeck)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id)
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' })
    }
    await deck.deleteOne()
    res.json({ message: 'Deck deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router

