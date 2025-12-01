require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const decksRouter = require('./routes/decks')
app.use('/flashcards/decks', decksRouter)

const flashcardsRouter = require('./routes/flashcards')
app.use('/flashcards', flashcardsRouter)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))