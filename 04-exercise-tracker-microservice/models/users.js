const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  exercises: [
    {
      description: { type: String, default: '' },
      duration: { type: Number, default: 0 },
      date: { type: Date, default: new Date() },
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
