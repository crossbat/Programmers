const conn = require('../database')
const { StatusCodes } = require('http-status-codes');

const allCategories = (req, res) => {
  let sql = 'SELECT * FROM categories'
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      res.status(StatusCodes.BAD_REQUEST).end()
    }
    if (results.length) {
      res.status(StatusCodes.OK).json(results)
    } else {
      res.status(StatusCodes.NOT_FOUND).end()
    }
  })
}

module.exports = allCategories
