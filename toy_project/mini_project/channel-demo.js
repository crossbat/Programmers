const express = require('express')
const app = express()
app.listen(3000)

app.use(express.json())

let db = new Map
var channelCnt = 1

function isFilled(a) {
  if (a.size !== 0) {
    return true
  } else {
    return false
  }
}

app.route('/channels')
  .get((req, res) => {
    if (isFilled(db)) {
      let dbJson = {}
      db.forEach((value, key) => {
        dbJson[key] = value
      })
      res.status(200).json(dbJson)
    } else {
      res.status(404).json({
        message: '채널이 없습니다.'
      })
    }
  })
  .post((req, res) => {
    let { channelName } = req.body
    if (channelName) {
      db.set(channelCnt++, { channelName: channelName })
      res.status(201).json({
        message: `${channelName}님, 만나서 반갑습니다.`
      })
    } else {
      res.status(400).json({
        message: "채널명을 작성해주세요"
      })
    }
  })

app.route('/channels/:id')
  .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    const channel = db.get(id)
    if (channel) {
      res.status(200).json(channel)
    } else {
      res.status(404).json({
        message: '등록되어있지 않은 채널입니다.'
      })
    }
  })
  .delete((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    const channel = db.get(id)
    if (channel) {
      res.status(200).json({
        message: `${channel.channelName}님의 계정이 삭제되었습니다.`
      })
      db.delete(id)
    } else {
      res.status(404).json({
        message: "등록되어있지 않은 계정입니다."
      })
    }
  })
  .put((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    let channel = db.get(id)
    let { channelName } = req.body
    if (channel) {
      if (channelName) {
        let old_name = channel.channelName
        channel.channelName = channelName
        res.status(200).json({
          message: `채널명이 변경되었습니다. ${old_name} -> ${channelName}`
        })
      } else {
        res.status(400).json({
          message: '채널명을 작성해주세요.'
        })
      }
    } else {
      res.status(404).json({
        message: '등록되어있지 않은 채널입니다.'
      })
    }
  })
