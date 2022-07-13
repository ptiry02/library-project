const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User.model')

router.get('/signup', async (req, res) => {
  res.render('auth/signup-form')
})

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.render('auth/signup-form', { errorMessage: 'Please provide email and password' })
    return
  }
  try {
    const salt = await bcryptjs.genSalt(14)
    const hash = await bcryptjs.hash(password, salt)
    const userDetails = {
      email,
      hashedPassword: hash,
    }
    const userFromDB = await User.create(userDetails)
    res.redirect('/books')
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(400).render('auth/signup', { errorMessage: e.message })
    } else if (e.code === 11000) {
      const error = new Error('This email is allready in use.')
      res.render('auth/signup-form', { errorMessage: error.message })
    } else {
      next(error)
    }
  }
})

router.get('/login', async (req, res) => {
  res.render('auth/login.form')
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.render('auth/signup-form', { errorMessage: 'Please provide email and password' })
    return
  }
  try {
    const userFromDB = await User.findOne({ email: email })
    if (!userFromDB) {
      res.render('auth/login', { errorMessage: "User doesn't exist" })
    } else if (bcryptjs.compareSync(password, userFromDB.hashedPassword)) {
      res.redirect('/user-profile')
    } else {
      res.render('auth/login', { errorMessage: 'Incorrect credentials.' })
    }
  } catch (e) {
    console.log('Error getting user from DB...', e)
    next(e)
  }
})

router.get('/user-profile', async (req, res) => {
  res.render('auth/user-profile')
})

module.exports = router
