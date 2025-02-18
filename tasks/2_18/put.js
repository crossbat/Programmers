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

//get, post, delete에 대한 코드는 코드가 너무 길어짐에 따라 생략하였음.
app.put('/youtubers/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  //delete 때와 마찬가지로 시인성이 더 좋을 것으로 판단하여
  //has를 사용하였음. 더불어 부정문의 의미를 넣기 위해 앞에 !를 삽입하였음.
  if (!youtubers.has(id)) {
    res.json({
      message: '요청하신 내용은 없습니다.'
    })
  } else {
    //본래 영상에서는 new_name을 id 값 안에 있는 name의 값을 변경한 후
    //다시 한번 set을 해주었는데, set을 따로 해주지 않더라도 수정이 되는 것을 확인할 수 있었음.
    new_name = req.body.name
    res.json({
      message: `${youtubers.get(id).name}님의 이름은 ${new_name}으로 수정되었습니다.`
    })
    youtubers.get(id).name = new_name
  }
})
