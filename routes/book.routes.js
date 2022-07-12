const Book = require('../models/Book.model')
const Author = require('../models/Author.model')

const router = require('express').Router()

router.get('/books', (req, res, next) => {
  Book.find()
    .populate('author')
    .then((books) => {
      const data = { books }
      if (req.query.minRating) {
        data.booksArr = books.filter((book) => book.rating <= req.query.minRating)
      }
      res.render('books/books-list', data)
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/books/delete', (req, res) => {
  Book.findByIdAndDelete(req.body.bookId).then(() => {
    res.redirect('/books')
  })
})

router.get('/books/create', (req, res) => {
  Author.find().then((authors) => {
    res.render('books/create-book', { authors })
  })
})

router.post('/books/create', (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating,
    description: req.body.description,
  }

  Book.create(newBook)
    .then(() => {
      res.redirect('/books')
    })
    .catch((err) => console.log(err))
})

router.get('/books/:bookId', (req, res, next) => {
  Book.findById(req.params.bookId)
    .populate('author')
    .then((book) => {
      console.log('details: ', book)
      res.render('books/book-details', book)
    })
    .catch((err) => console.log(err))
})

router.get('/books/:bookId/edit', (req, res) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      res.render('books/edit-book', book)
    })
    .catch((error) => {
      console.log('Error getting book details from DB', error)
      next(error)
    })
})

router.post('/books/:bookId/edit', (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, {
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating,
    description: req.body.description,
  }).then(() => {
    res.redirect('/books')
  })
})

module.exports = router
