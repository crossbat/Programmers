const express = require('express')
const axios = require('axios')
const app = express()
const port = 3001

let region_code = [
  '130000',
  '260000',
  '270000',
  '016000',
  '230000',
  '290000',
  '400000',
  '471000',
  '140000'
]

const url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=1'

app.get('/', async (req, res) => {
  try {
    axios.get(url).then(response => {
      exchange_response = response.data
    }).catch(error => {
      console.error(error)
    })

    region_response = await Promise.all(
      region_code.map(async (code) => {
        const region_url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${code}.json`
        try {
          const response = await axios.get(region_url)
          return {
            code,
            time: response.data[0].timeSeries[0].timeDefines[0],
            weather_code: response.data[0].timeSeries[0].areas[0].weatherCodes[0],
            temperture: response.data[0].timeSeries[2].areas[0].temps[0]
          }
        } catch {
          console.log('error1')
        }
      })
    )

    res.json({
      region: region_response,
      exchange: exchange_response
    })
  } catch (error) {
    console.log('error2')
  }
})
app.listen(port)
