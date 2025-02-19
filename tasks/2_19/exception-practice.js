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
  let youtuber = youtubers.get(id)
  if (youtuber) {
    res.json(youtuber)
  } else {
    res.status(404).json({
      message: '찾으시는 내용이 없습니다.'
    })
  }
})

app.get('/youtubers', (req, res) => {
  //res.json(Object.fromEntries(youtubers))
  youtuberJson = {}
  if (youtubers.size !== 0) {
    youtubers.forEach(function (value, key) {
      youtuberJson[key] = value
    })
    res.json(youtuberJson)
  } else {
    res.status(404).json({
      message: '조회할 내용이 없습니다.'
    })
  }
})

app.use(express.json())
app.post('/youtubers', (req, res) => {
  console.log((req.body))
  if (req.body.name) {
    youtubers.set(cntid++, req.body)
    res.status(201).json({
      message: youtubers.get(cntid - 1).name + '님, 유튜버 생활을 응원합니다.'
    })
  } else {
    res.status(400).json({
      message: '요청값이 잘못되었습니다.'
    })
  }
})

// 개별 유튜버 삭제
app.delete('/youtubers/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let youtuber = youtubers.get(id)
  if (youtuber) {
    res.json({
      message: `${youtubers.get(id).name}님, 그동안 감사했습니다.`
    })
    youtubers.delete(id)
  } else {
    res.status(404).json({
      message: '등록되지 않은 계정은 삭제할 수 없습니다.'
    })
  }
})

//전체 유튜버 삭제
app.delete('/youtubers', (req, res) => {
  if (youtubers.size >= 1) {
    res.json({
      message: '전체 계정이 삭제되었습니다.'
    })
    youtubers.clear()
  } else {
    res.status(404).json({
      message: '삭제할 데이터가 없습니다.'
    })
  }
})

app.put('/youtubers/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let youtuber = youtubers.get(id)
  if (youtuber) {
    if (req.body.name) {
      new_name = req.body.name
      res.json({
        message: `${youtubers.get(id).name}님의 이름은 ${new_name}으로 수정되었습니다.`
      })
      youtubers.get(id).name = new_name
    } else {
      res.status(400).json({
        message: '요청한 값이 없습니다.'
      })
    }
  } else {
    res.status(404).json({
      message: '요청하신 내용은 없습니다.'
    })
  }
})
