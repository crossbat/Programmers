const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const { body, param, validationResult, validate } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const bookSearch = (req, res) => {
  let { category_id, recent, limit, currentPage } = req.query
  let offset = limit * (currentPage - 1)
  let sql = 'SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books'

  offset = parseInt(offset)
  limit = parseInt(limit)

  let values = [category_id, limit, offset]

  if (category_id && recent) {
    sql += ' WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()'
  } else if (category_id) {
    sql += ' WHERE category_id=?'
  } else if (recent) {
    values = values.slice(1, 3)
    sql += ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()'
  } else {
    values = values.slice(1, 3)
    sql += ' LIMIT ? OFFSET ?;'
  }

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err)
      console.log(values)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    if (results.length) {
      return res.status(StatusCodes.OK).json(results)
    } else {
      return res.status(StatusCodes.NOT_FOUND).end()
    }
  })
}


const eachBook = (req, res) => {
  let { id } = req.params
  let { user_id } = req.body
  id = parseInt(id)
  user_id = parseInt(user_id)

  let likesSql = ', (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes'
  let likedSql = ', (SELECT EXISTS(SELECT * FROM likes WHERE liked_book_id=? AND user_id=?)) AS liked'
  let sql = `SELECT *${likesSql}${likedSql} FROM books LEFT JOIN categories ON books.category_id = categories.category_id WHERE books.id = ?`
  let values = [id, user_id, id]
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err)
      console.log(id)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    if (results[0]) {
      return res.status(StatusCodes.OK).json(results[0])
    } else {
      return res.status(StatusCodes.NOT_FOUND).end()
    }
  })
}

module.exports = {
  bookSearch,
  eachBook,
}
