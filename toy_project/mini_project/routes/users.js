const express = require('express')
const { body, validationResult } = require("express-validator")
const router = express.Router()
const conn = require('../db-demo')

router.use(express.json())

router.post('/login', (req, res) => {
  const { email, password } = req.body
  let sql = `SELECT * FROM users WHERE email = ?`
  conn.query(sql, email, function (err, results) {
    let loginUser = results[0]
    if (loginUser && loginUser.password == password) {
      res.status(200).json({
        message: `${email}님 로그인이 되었습니다.`
      })
    } else {
      res.status(404).json({
        message: "아이디 또는 비밀번호가 틀렸습니다."
      })
    }
  })
})

router.post('/join', (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: "입력 값을 다시 확인해주세요"
    })
  } else {
    let { email, name, password, contact } = req.body
    let sql1 = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
    let sql2 = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`
    if (contact) {
      conn.query(sql1, [email, name, password, contact], function (err, results) {
        res.status(200).json(results)
      })
    } else {
      conn.query(sql2, [email, name, password], function (err, results) {
        res.status(200).json(results)
      })
    }
  }
})

router.get('/users', (req, res) => {
  let { email } = req.body
  let sql = `SELECT * FROM users WHERE email = ?`
  conn.query(sql, email, function (err, results) {
    res.status(200).json(results)
  })
})

router.delete('/users', (req, res) => {
  let { email } = req.body
  let sql = `DELETE FROM users WHERE email = ?`
  conn.query(sql, email, function (err, results) {
    res.status(200).json(results)
  })
})

module.exports = router
