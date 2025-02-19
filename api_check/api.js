const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=1'

app.get('/', (req, res) => {
  axios.get(url).then(response => {
    const exchangeRate = response.data
    const data = exchangeRate.country[1].value
    const ext = parseFloat(data) * 100
    res.json(ext)
  })
})

app.listen(port)
