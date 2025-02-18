const express = require('express')
const app = express()
var id = 1

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

youtubers.set(id++, youtuber1)
youtubers.set(id++, youtuber2)
youtubers.set(id++, youtuber3)

//get, post에 대한 코드는 코드가 너무 길어짐에 따라 생략하였음.

// 개별 유튜버 삭제
app.delete('/youtubers/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  //영상에서는 youtubers.get(id) == undefined라고 작성하였는데,
  //has라는 함수를 발견하였고, 해당 방법이 더 시인성이 좋을 것으로 판단하여 바꾸었음.
  if (!youtubers.has(id)) {
    res.json({
      message: '등록되지 않은 계정은 삭제할 수 없습니다.'
    })
  } else {
    res.json({
      message: `${youtubers.get(id).name}님, 그동안 감사했습니다.`
    })
    youtubers.delete(id)
  }
})

app.delete('/youtubers', (req, res) => {
  if (youtubers.size >= 1) {
    res.json({
      message: '전체 계정이 삭제되었습니다.'
    })
    youtubers.clear()
  } else {
    res.json({
      message: '삭제할 데이터가 없습니다.'
    })
  }
})
