var express = require('express');
var router = express.Router();
//환율 API 추가
const axios = require('axios');

let region_code = [
  '130000', // 도쿄
  '260000', // 교토
  '270000', // 오사카
  '016000', // 삿포로
  '230000', // 나고야
  '290000', // 나라
  '400000', // 후쿠오카
  '471000', // 오키나와
  '140000'  // 요코하마
]

const url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=1'

/* GET home page. */
router.get('/', async (req, res) => {
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

    res.render('index', {
      title: 'Welcome Japan',
      exc: exchange_response.country[1].value,
      weather: region_response
    })

  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
