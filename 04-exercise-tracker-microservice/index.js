require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectDb = require('./connect.js')
const userRouter = require('./routes/user.router.js')
const User = require('./models/users.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/api/users', userRouter)

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Your app is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

start()
