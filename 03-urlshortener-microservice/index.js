require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dns = require('dns').promises
const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json()) // parse incoming JSON
app.use(express.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

const shorturls = []

// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', async (req, res) => {
  const { url } = req.body

  // Using the URL constructor to get the details of an endpoint
  const siteDetails = new URL(url)

  if (!['http:', 'https:'].includes(siteDetails.protocol)) {
    return res.json({ error: 'invalid url' })
  }

  const hostname = siteDetails.host

  try {
    const options = { all: true }
    await dns.lookup(hostname, options)

    const newShorturl = { id: shorturls.length + 1, url }

    shorturls.push(newShorturl)

    res.status(200).json({
      original_url: newShorturl.url,
      short_url: newShorturl.id,
    })
  } catch (error) {
    res.json({ error: 'invalid url' })
  }
})

app.get('/api/shorturl/:id', (req, res) => {
  const { id } = req.params

  const foundUrl = shorturls.find((shorturl) => shorturl.id === Number(id))

  res.redirect(foundUrl.url)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
