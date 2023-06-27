require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.get('/api/whoami', (req, res) => {
  res.status(200).json({
    ipaddress: req.ip,
    language: req.get('accept-language'),
    software: req.get('user-agent'),
  })
})

const PORT = process.env.PORT || 8080
// listen for requests :)
app.listen(8080, () => {
  console.log(`Server running on port ${PORT}`)
})
