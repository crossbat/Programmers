const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const addLikes = (req, res) => {
  let { id } = req.params
  let { user_id } = req.body
  id = parseInt(id)
  const sql1 = 'SELECT * FROM likes WHERE user_id=? AND liked_book_id=?'
  const sql2 = 'INSERT INTO likes VALUES(?, ?)'
  const values = [user_id, id]
  conn.query(sql1, values, (err, results) => {
    if (results[0]) {
      return res.status(StatusCodes.OK).json({
        message: '이미 좋아요를 눌렀습니다.'
      })
    } else if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    } else {
      conn.query(sql2, values, (err, results) => {
        if (err) {
          console.log(err)
          return res.status(StatusCodes.BAD_REQUEST).end()
        }
        return res.status(StatusCodes.CREATED).json(results)
      })
    }
  })
}

const deleteLikes = (req, res) => {
  let { id } = req.params
  let { user_id } = req.body
  id = parseInt(id)
  const sql = 'DELETE FROM likes WHERE user_id=? AND liked_book_id=?'
  const values = [user_id, id]
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.CREATED).json(results)
  })
}

module.exports = { addLikes, deleteLikes }
