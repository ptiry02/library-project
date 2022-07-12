const { Schema, model } = require('mongoose')

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author:
      {
        type: Schema.Types.ObjectId,
        ref: 'Author',
      } | { type: String, enum: ['unknown'] },
    rating: Number,
  },
  {
    timestamps: true,
  }
)

const Book = model('Book', bookSchema)

module.exports = Book
