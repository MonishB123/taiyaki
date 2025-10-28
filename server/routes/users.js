const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
})
const User = mongoose.model('User', userSchema)

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already in use' })

    const user = new User({ username, email, password })
    await user.save()
    res.status(201).json({ username, email })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    res.json({ username: user.username, email: user.email })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
