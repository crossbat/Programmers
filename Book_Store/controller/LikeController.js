const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const authorization = require('../Authorization.js');

const addLikes = (req, res) => {
  let { BookId } = req.params
  BookId = parseInt(BookId)
  const auth = authorization(req)

  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    })
  } else {
    const sql1 = 'SELECT * FROM likes WHERE user_id=? AND liked_book_id=?'
    const sql2 = 'INSERT INTO likes VALUES(?, ?)'
    const values = [auth.id, BookId]
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
}

const deleteLikes = (req, res) => {
  let { BookId } = req.params
  BookId = parseInt(BookId)
  const auth = authorization(req);

  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    })
  } else {
    const sql = 'DELETE FROM likes WHERE user_id=? AND liked_book_id=?'
    const values = [auth.id, BookId]
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
      }
      return res.status(StatusCodes.CREATED).json(results)
    })
  }
}

module.exports = { addLikes, deleteLikes }
