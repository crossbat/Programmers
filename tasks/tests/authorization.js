const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

app.listen(process.env.PORT);

app.get('/', (req, res) => {
  let token = jwt.sign({ user: 1 }, process.env.PRIVATE_KEY, {
    expiresIn: '1m',
    issuer: 'crossbat'
  });
  res.header({
    'authorization': token
  });
  res.send('토큰발행 완료')
})

app.get('/jwt/decoded', (req, res) => {
  const token = req.headers["authorization"]
  let decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  console.log(token)

  res.send(decoded);
})
