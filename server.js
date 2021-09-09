const express = require('express')
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

//POST /api/fileanalyse to upload the file and return
//name, type, and size
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let file = req.file //var to hold the uploaded file data
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
