const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const join = (req, res) => {
  let { email, password } = req.body

  const salt = crypto.randomBytes(10).toString('base64')
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')

  sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)'
  conn.query(sql, [email, hashPassword, salt], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).json(err)
    }
    res.status(StatusCodes.CREATED).json(results)
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    let loginUser = results[0]

    const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')

    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign({
        email: loginUser.email,
      }, process.env.PRIVATE_KEY, {
        expiresIn: '30m',
        issuer: 'crossbat'
      })
      res.cookie('token', token, {
        httpOnly: true
      })
      res.status(StatusCodes.OK).json({
        message: `${loginUser.email}님이 로그인 되었습니다.`
      })
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: '일치하는 회원정보가 없습니다.'
      })
    }
  })
}

const reset_request = (req, res) => {
  const { email } = req.body
  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    let user = results[0]
    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email
      })
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end()
    }
  })
}

const reset_password = (req, res) => {
  const { email, new_password } = req.body
  let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?'

  const salt = crypto.randomBytes(10).toString('base64')
  const hashPassword = crypto.pbkdf2Sync(new_password, salt, 10000, 10, 'sha512').toString('base64')

  conn.query(sql, [hashPassword, salt, email], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST)
    } else {
      return res.status(StatusCodes.OK).end()
    }
  })
}

module.exports = {
  join,
  login,
  reset_request,
  reset_password
}
