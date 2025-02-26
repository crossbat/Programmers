const express = require('express')
const router = express.Router()
const conn = require('../db-demo')

router.use(express.json())

let db = new Map
var channelCnt = 1

function isFilled(a) {
  if (a.size !== 0) {
    return true
  } else {
    return false
  }
}

router.route('/')
  .get((req, res) => {
    var { user_id } = req.body


    let sql = `SELECT * FROM channels WHERE user_id = ?`
    if (user_id) {
      conn.query(sql, user_id, function (err, results) {
        if (results.length) {
          res.status(200).json(results)
        } else {
          notFoundChannel(res)
        }
      })
    } else {
      res.status(400).end()
    }
  })
  .post((req, res) => {
    let { name, user_id } = req.body
    if (name && user_id) {
      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
      let values = [name, user_id]
      conn.query(sql, values, function (err, results) {
        res.status(201).json(results)
      })
    } else {
      res.status(400).json({
        message: "요청값을 제대로 보내주세요"
      })
    }
  })

router.route('/:id')
  .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    let sql = `SELECT * FROM channels WHERE id = ?`
    conn.query(sql, id, function (err, results) {
      if (results.length) {
        res.status(200).json(results)
      } else {
        notFoundChannel(res)
      }
    })
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
      notFoundChannel()
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
      notFoundChannel()
    }
  })

function notFoundChannel(res) {
  res.status(404).json({
    message: '등록되어있지 않은 채널입니다.'
  })
}

module.exports = router
