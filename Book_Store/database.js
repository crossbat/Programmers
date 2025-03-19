const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config()

const connection = {
  host: '127.0.0.1',
  user: 'root',
  database: 'BookStore',
  password: '0560',
  dateStrings: true
}

module.exports = connection
