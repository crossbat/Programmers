const express = require('express')
const app = express()
var cntid = 1

app.listen(3000)

youtubers = new Map()

youtuber1 = {
  id: '@15ya_egg',
  name: '채널십오야',
  sub: 6880000,
  videos: 15000
}

youtuber2 = {
  id: '@TEO_universe',
  name: 'TEO 테오',
  sub: 1240000,
  videos: 12000
}

youtuber3 = {
  id: '@youngji_boxmedia',
  name: '차린건 쥐뿔도 없지만',
  sub: 4080000,
  videos: 52
}

youtubers.set(cntid++, youtuber1)
youtubers.set(cntid++, youtuber2)
youtubers.set(cntid++, youtuber3)

app.get('/youtubers/:id', function (req, res) {
  let { id } = req.params
  id = parseInt(id)
  if (youtubers.get(id) == undefined) {
    res.json({
      message: 'none'
    })
  } else {
    res.json(youtubers.get(id))
  }
})

app.get('/youtubers', (req, res) => {
  //res.json(Object.fromEntries(youtubers))
  youtuberJson = {}
  youtubers.forEach(function (value, key) {
    youtuberJson[key] = value
  })
  res.json(youtuberJson)
})

//post는 바디값을 리퀘스트 받아 그대로 서버로 보낸다.
//리스폰스 값은 그 결과에 대한 프런트를 내보낸다.
app.use(express.json())
app.post('/youtubers', (req, res) => {
  console.log((req.body))
  youtubers.set(cntid++, req.body)
  res.json({
    message: youtubers.get(cntid - 1).name + '님, 유튜버 생활을 응원합니다.'
  })
})
