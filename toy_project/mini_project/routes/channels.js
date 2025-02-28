const express = require('express')
const { body, param, validationResult } = require('express-validator')
const router = express.Router()
const conn = require('../db-demo')

router.use(express.json())

router.route('/')
  .get(body('user_id').notEmpty().isInt().withMessage("숫자로 입력해주세요"), (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }

    var { user_id } = req.body
    let sql = `SELECT * FROM channels WHERE user_id = ?`
    conn.query(sql, user_id, function (err, results) {
      isError(res, err, 400)

      if (results.length) {
        res.status(200).json(results)
      } else {
        notFoundChannel(res)
      }
    })
  })
  .post([
    body('user_id').notEmpty().isInt().withMessage('숫자를 입력해주세요.'),
    body('name').notEmpty().isString().withMessage('문자로 입력해주세요.')
  ], (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }
    let { name, user_id } = req.body
    let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
    let values = [name, user_id]
    conn.query(sql, values, function (err, results) {
      isError(res, err, 500)
    })
  })

router.route('/:id')
  .get(param('id').notEmpty().withMessage('채널 아이디가 필요합니다.'), (req, res) => {
    const err = validationResult(req)
    if (err.notEmpty()) {
      return res.status(400).json(err.array())
    }

    let { id } = req.params
    id = parseInt(id)

    let sql = `SELECT * FROM channels WHERE id = ?`
    conn.query(sql, id, function (err, results) {
      isError(res, err, 404)

      if (results.length) {
        res.status(200).json(results)
      } else {
        notFoundChannel(res)
      }
    })
  })
  .delete(param('id').notEmpty().withMessage('존재하지 않는 채널입니다.'), (req, res) => {
    let err = validationResult(req)

    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }

    let { id } = req.params
    id = parseInt(id)

    let sql = `DELETE FROM channels WHERE id = ?`
    conn.query(sql, id, function (err, results) {
      isError(res, err, 400)
      if (results.affectedRows == 0) {
        return res.status(400).end()
      } else {
        res.status(200).json(results)
      }
    })
  })
  .put([param('id').notEmpty().withMessage('채널이 존재하지 않습니다.'),
  body('name').notEmpty().isString().withMessage('채널명이 유효하지 않습니다.')
  ], (req, res) => {
    let err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }

    let { id } = req.params
    let { name } = req.body
    id = parseInt(id)

    let sql = `UPDATE channels SET name=? WHERE id = ?`
    let values = [name, id]
    conn.query(sql, values, function (err, results) {
      isError(res, err, 404)
      if (results.affectedRows == 0) {
        return res.status(400).end()
      } else {
        res.status(200).json(results)
      }
    })
  })

function notFoundChannel(res) {
  res.status(404).json({
    message: '등록되어있지 않은 채널입니다.'
  })
}

function isError(res, err, err_code) {
  if (err) {
    console.log(err)
    return res.status(err_code).json(err)
  }
}

module.exports = router
