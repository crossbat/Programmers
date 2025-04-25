const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const authorization = require('../Authorization.js')

const addCart = (req, res) => {
  const { book_id, count } = req.body
  const auth = authorization(req, res)

  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    })
  } else {
    const sql = 'INSERT INTO cartItems (book_id, count, user_id) VALUES (?, ?, ?)'
    const value = [book_id, count, auth.id]
    conn.query(sql, value, (err, results) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).end()
      }
      return res.status(StatusCodes.OK).json(results)
    })
  }
}

const viewCart = (req, res) => {
  const { selected } = req.body
  const auth = authorization(req, res);

  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    })
  } else {
    let sql = 'SELECT cartItems.id, book_id, title, summary, count, price FROM cartItems LEFT JOIN books on cartItems.book_id = books.id WHERE user_id = ?'
    let values = [auth.id];
    if (selected) {
      sql += ' AND cartItems.id IN (?)'
      values.push(selected)
    }
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
      }
      return res.status(StatusCodes.OK).json(results)
    })
  }
}

const deleteCart = (req, res) => {
  const { cart_id } = req.params
  const auth = authorization(req, res)
  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    })
  } else {
    const sql = 'DELETE FROM cartItems WHERE id=? AND user_id=?'
    const value = [cart_id, auth.id]
    conn.query(sql, value, (err, results) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end()
      }
      return res.status(StatusCodes.ACCEPTED).end()
    })
  }
}

module.exports = {
  addCart,
  viewCart,
  deleteCart
}
