
const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '\images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ storage: storage })

app.get('/api/upload', (req, res) => {
	res.render('upload')
})

app.post('/api/upload', upload.single('image'), (req, res) => {
	res.send('uploaded')
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
