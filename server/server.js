require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const decksRouter = require('./routes/decks')
app.use('/flashcards/decks', decksRouter)

const flashcardsRouter = require('./routes/flashcards')
app.use('/flashcards', flashcardsRouter)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


app.listen(5000, () => console.log('Server Started'))