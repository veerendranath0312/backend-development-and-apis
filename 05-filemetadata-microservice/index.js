const express = require('express')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Configuration for multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`)
  },
})

const upload = multer({ storage: multerStorage })

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  console.log(req.file)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
})

app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
})
