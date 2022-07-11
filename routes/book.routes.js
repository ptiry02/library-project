const Book = require('../models/Book.model')

const router = require('express').Router()

router.get('/books', (req, res, next) => {
  Book.find()
    .then((books) => {
      const data = { booksArr: books }

      res.render('books/books-list', data)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
