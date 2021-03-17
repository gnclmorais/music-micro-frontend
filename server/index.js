const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 8080

app.use(cors())

app.get('/', (req, res) => res.redirect(301, '/hello'))

app.use('/hello/:page', express.static(path.join(__dirname, '../bootstrap/dist')))
app.use('/hello', express.static(path.join(__dirname, '../bootstrap/dist')))

app.use(/\/play/, express.static(path.join(__dirname, '../bootstrap/dist')))

app.use('/mfe/welcome', express.static(path.join(__dirname, '../welcome/dist')))
app.use('/mfe/music', express.static(path.join(__dirname, '../music/build')))

app.get('*', (req, res) => res.send('Page not found (404)'))

app.listen(port, () => console.log(`Server listening at http://localhost:${port}…`))
