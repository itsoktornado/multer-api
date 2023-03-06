
const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const url = require('url')
const http = require('http')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage: storage })

app.get('/api/:filename', (req, res) => {
	const filename = req.params.filename

	fs.readFile(`./images/${filename}`, (err, data) => {
		if (err) {
			console.log('no image found')
		}
		else {
			res.writeHead(200, {'Content-Type': 'image/png'})
			
			return res.end(data)
		}
	})
})

app.post('/api/upload', upload.single('image'), (req, res) => {
	res.send(req.file)
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
