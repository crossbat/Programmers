const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.listen(3000)

app.use(express.json())
app.post('/', (req, res) => {
  console.log(req.body)
  let { id, password } = req.body
  console.log(id, password)
})
