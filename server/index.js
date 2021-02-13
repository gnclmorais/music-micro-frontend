const express = require('express')
const path = require('path')

const app = express()
const port = 8080

app.use('/', express.static(path.join(__dirname, '../bootstrap')))
app.use('/mfe/welcome', express.static(path.join(__dirname, '../welcome/public')))
app.use('/mfe/music', express.static(path.join(__dirname, '../music/public')))

app.listen(port, () => console.log(`Web server listening at http://localhost:${port}…`));
