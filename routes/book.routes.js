const Book = require('../models/Book.model')

const router = require('express').Router()

router.get('/books', (req, res, next) => {
  Book.find()
    .then((books) => {
      const data = { booksArr: books }
      if (req.query.minRating) {
        data.booksArr = books.filter((book) => book.rating <= req.query.minRating)
      }
      res.render('books/books-list', data)
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/books/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      res.render('books/book-details', book)
    })
    .catch((err) => console.log(err))
})

module.exports = router
