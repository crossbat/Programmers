const express = require('express')
const app = express()
app.listen(3000)

const user = require('./routes/users')
const channel = require('./routes/channels')

app.use('/', user)
app.use('/channels', channel)
