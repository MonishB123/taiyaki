const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const flashcardSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Flashcard = mongoose.model('Flashcard', flashcardSchema)


// Getting all
router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find()
        res.json(flashcards)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting One
router.get('/:id', getFlashcard, (req, res) => {
    res.json(res.flashcard)
})

// Creating One
router.post('/', async (req, res) => {
    const flashcard = new Flashcard({
        front: req.body.front,
        back: req.body.back
    })

    try {
        const newFlashcard = await flashcard.save()
        res.status(201).json(newFlashcard)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Updating One
router.patch('/:id', getFlashcard, async (req, res) => {
    if (req.body.front != null) {
        res.flashcard.front = req.body.front
    }
    if (req.body.back != null) {
        res.flashcard.back = req.body.back
    }
    try {
        const updatedflashcard = await res.flashcard.save()
        res.json(updatedflashcard)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting One
router.delete('/:id', getFlashcard, async (req, res) => {
    try {
        await res.flashcard.deleteOne()
        res.json({message: 'Deleted Flashcard'})
    } catch(err) {
        {
            res.status(500).json({message: err.message}) 
        }
    }
})

// Delete All
router.delete('/', async (req, res) => {
    try {
        await Flashcard.deleteMany()
        res.json({message: 'Deleted All Flashcards'})
    } catch(err) {
        {
            res.status(500).json({message: err.message}) 
        }
    }
})

async function getFlashcard(req, res, next) {
    let flashcard
    try {
        flashcard = await Flashcard.findById(req.params.id)
        if (flashcard == null) {
            return res.status(404).json({message: 'Cannot find flashcard'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.flashcard = flashcard
    next()
}

module.exports = router
