const express = require('express')
const { body, param, validationResult } = require("express-validator")
const router = express.Router()
const conn = require('../db-demo')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


router.use(express.json())

const validate = (req, res, next) => {
  const err = validationResult(req)

  if (err.isEmpty()) {
    return next()
  } else {
    res.status(400).json(err.array())
  }
}

function isError(res, err, err_code) {
  if (err) {
    console.log(err)
    return res.status(err_code).json(err)
  }
}

router
  .route('/login')
  .post([
    body('email').notEmpty().isString().isEmail().withMessage("이메일을 다시 한 번 작성해주세요"),
    body('password').notEmpty().isString().withMessage('비밀번호를 다시 한 번 확인해주세요'),
    validate
  ], (req, res) => {
    const { email, password } = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql, email, function (err, results) {
      let loginUser = results[0]
      if (loginUser && loginUser.password == password) {
        const token = jwt.sign({
          email: loginUser.email,
          name: loginUser.name
        }, process.env.PRIVATE_KEY, {
          expiresIn: '30m',
          issuer: "kim"
        })
        res.cookie("token", token, {
          httpOnly: true
        })
        res.status(200).json({
          message: `${loginUser.name}님 로그인이 되었습니다.`
        })
      } else {
        res.status(403).json({
          message: "접근 권한이 없습니다."
        })
      }
    })
  })

router
  .route('/join')
  .post([
    body('email').notEmpty().isString().isEmail().withMessage("이메일을 다시 한 번 확인해주세요."),
    body('name').notEmpty().isString().withMessage("이름을 문자로 작성해주세요."),
    body('password').notEmpty().isString().withMessage("비밀번호를 다시 한 번 확인해주세요"),
    body('contact').notEmpty().isString().withMessage("비밀번호를 다시 한 번 확인해주세요"),
    validate
  ], (req, res) => {
    let { email, name, password, contact } = req.body
    let sql1 = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
    let sql2 = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`
    if (contact) {
      conn.query(sql1, [email, name, password, contact], function (err, results) {
        isError(res, err, 400)
        res.status(200).json(results)
      })
    } else {
      conn.query(sql2, [email, name, password], function (err, results) {
        isError(res, err, 400)
        res.status(200).json(results)
      })
    }
  })

router
  .route('/users')
  .get([
    body('email').notEmpty().isString().isEmail().withMessage("이메일을 다시 한 번 확인해주세요"),
    validate
  ], (req, res) => {
    let { email } = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql, email, function (err, results) {
      isError(res, err, 400)
      res.status(200).json(results)
    })
  })
  .delete([
    body('email').notEmpty().isString().isEmail().withMessage("이메일을 다시 한 번 확인해주세요"),
    validate
  ], (req, res) => {
    let { email } = req.body
    let sql = `DELETE FROM users WHERE email = ?`
    conn.query(sql, email, function (err, results) {
      isError(res, err, 400)
      if (results.affectedRows == 0) {
        return res.status(400).end()
      } else {
        res.status(200).json(results)
      }
    })
  })

module.exports = router
