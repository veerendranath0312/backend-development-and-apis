var express = require('express')
var cors = require('cors')
require('dotenv').config()

var app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})
