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

app.get('/api/:date?', (req, res) => {
  let date = req.params.date

  if (date === undefined) {
    const now = new Date()
    return res.status(200).json({ unix: now.valueOf(), utc: now.toUTCString() })
  }

  let unixRegex = /\d{5,}/

  if (unixRegex.test(date)) {
    let dateObj = new Date(parseInt(date))
    res
      .status(200)
      .json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString() })
  } else {
    let dateObj = new Date(date)
    if (dateObj.toString() === 'Invalid Date') {
      res.status(400).json({ error: 'Invalid Date' })
    } else {
      res
        .status(200)
        .json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString() })
    }
  }
})

const PORT = process.env.PORT || 8080

// listen for requests :)
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`)
})
