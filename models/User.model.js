const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: [true, 'User already exists'],
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', userSchema)
