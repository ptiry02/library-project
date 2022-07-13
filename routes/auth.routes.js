const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const User = require('../models/User.model')

router.get('/signup', async (req, res) => {
  res.render('auth/signup-form')
})

router.post('/signup', async (req, res) => {
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
    console.log('something went wrong...', e)
    const error = new Error('There has been a problem.')
    res.render('auth/signup-form', { errorMessage: error.message })
  }
})

module.exports = router
