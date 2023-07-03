const mongoose = require('mongoose')

const connectDb = async (url) => {
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

module.exports = connectDb
