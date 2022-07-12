const { Schema, model } = require('mongoose')

const authorSchema = {
  name: String,
  age: Number,
  country: String,
}

const Author = model('Author', authorSchema)

module.exports = Author
