const conn = require('../database')
const { StatusCodes } = require('http-status-codes');

const addCart = (req, res) => {
  const { book_id, user_id, count } = req.body
  const sql = 'INSERT INTO cartItems (book_id, count, user_id) VALUES (?, ?, ?)'
  const value = [book_id, count, user_id]
  conn.query(sql, value, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.OK).json(results)
  })
}

const viewCart = (req, res) => {
  const { user_id, selected } = req.body
  let sql = 'SELECT cartItems.id, book_id, title, summary, count, price FROM cartItems LEFT JOIN books on cartItems.book_id = books.id WHERE user_id = ?'
  if (selected == undefined) {
    conn.query(sql, user_id, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
      }
      return res.status(StatusCodes.OK).json(results)
    })
  } else {
    sql += ' AND cartItems.id IN (?)'
    conn.query(sql, [user_id, selected], (err, results) => {
      if (err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end()
      }
      return res.status(StatusCodes.OK).json(results)
    })
  }
}

const deleteCart = (req, res) => {
  const { user_id } = req.params
  const { book_id } = req.body
  const sql = 'DELETE FROM cartItems WHERE user_id = ? AND book_id = ?'
  const value = [user_id, book_id]
  conn.query(sql, value, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.ACCEPTED).end()
  })
}

module.exports = {
  addCart,
  viewCart,
  deleteCart
}
