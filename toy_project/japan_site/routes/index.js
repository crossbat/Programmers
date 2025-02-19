var express = require('express');
var router = express.Router();
//환율 API 추가
const axios = require('axios');

const url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=1'

/* GET home page. */
router.get('/', function (req, res, next) {
  //환율 api 연결
  axios.get(url).then(response => {
    const exchangeRate = response.data
    const data = parseFloat(exchangeRate.country[1].value) * 100
    res.render('index', { title: 'Welcome Japan', exc: data });
  }).catch(error => {
    console.error(error)
    res.status(500)
  })
  //화면 렌더링
});

module.exports = router;
