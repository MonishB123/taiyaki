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
    deckId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema)


router.put('/cards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id)
        if (!flashcard) {
            return res.status(404).json({ message: 'Card not found' })
        }
        
        if (req.body.front != null) {
            flashcard.front = req.body.front
        }
        if (req.body.back != null) {
            flashcard.back = req.body.back
        }
        
        const updatedFlashcard = await flashcard.save()
        res.json(updatedFlashcard)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/cards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id)
        if (!flashcard) {
            return res.status(404).json({ message: 'Card not found' })
        }
        await flashcard.deleteOne()
        res.json({ message: 'Card deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
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
