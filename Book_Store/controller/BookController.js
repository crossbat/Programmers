const conn = require('../database')
const auth = require('../Authorization.js');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const bookSearch = (req, res) => {
  let { category_id, recent, limit, currentPage } = req.query
  let offset = limit * (currentPage - 1)
  let sql = 'SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books'

  offset = parseInt(offset)
  limit = parseInt(limit)

  let allBooksRes = {};

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
      allBooksRes.books = results
    } else {
      return res.status(StatusCodes.NOT_FOUND).end()
    }
  })

  sql = 'SELECT found_rows()'
  conn.query(sql, (err, results) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
    }

    let pagination = {};
    pagination.totalCount = results[0]['found_rows()']
    pagination.currentPage = currentPage;

    allBooksRes.pagination = pagination

    return res.status(StatusCodes.OK).json(allBooksRes)
  });
}

const eachBook = (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let likesSql = ', (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes'
  let likedSql = ', (SELECT EXISTS(SELECT * FROM likes WHERE liked_book_id=? AND user_id=?)) AS liked'
  let sql;

  let authorization = auth(req);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '토큰이 만료되었습니다.'
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰이 조작되거나 올바르지 않습니다.'
    })
  } else if (authorization instanceof ReferenceError) {
    sql = `SELECT *${likesSql} FROM books LEFT JOIN categories ON books.category_id = categories.category_id WHERE books.id = ?`
  } else {
    sql = `SELECT *${likesSql}${likedSql} FROM books LEFT JOIN categories ON books.category_id = categories.category_id WHERE books.id = ?`
  }
  let values = [id, authorization.id, id]
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
