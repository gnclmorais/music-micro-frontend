const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 8080

app.use(cors())

// app.use(/\/(hello|play)\/.*/, express.static(path.join(__dirname, '../bootstrap/dist')))
app.use(/\/(hello|play)/, express.static(path.join(__dirname, '../bootstrap/dist')))

// app.use(/\/hello\/.*/, express.static(path.join(__dirname, '../welcome/dist')))
// app.use(/\/play\/.*/, express.static(path.join(__dirname, '../music/build')))

app.use('/mfe/welcome', express.static(path.join(__dirname, '../welcome/dist')))
app.use('/mfe/music', express.static(path.join(__dirname, '../music/build')))

app.listen(port, () => console.log(`Web server listening at http://localhost:${port}…`));
