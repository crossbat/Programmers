const conn = require('../database')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const { body, param, validationResult, validate } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const bookMain = (req, res) => {
  let sql = 'SELECT id, title, summary, author, price, pub_date FROM books;'
  conn.query(sql, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end()
    } else {
      return res.status(StatusCodes.OK).json(results)
    }
  })
}

const bookSearch = (req, res) => {
  let { category_id } = req.query
  let sql = 'SELECT * FROM books WHERE category_id = ?'
  conn.query(sql, category_id, (err, results) => {
    if (err) {
      console.log(category_id)
      console.log(err)
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
  let sql = "SELECT * FROM books WHERE id = ?;"
  conn.query(sql, id, (err, results) => {
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
  bookMain,
  bookSearch,
  eachBook,
}
