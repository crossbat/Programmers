// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'youtube',
  password: '0560',
  dateStrings: true
});

module.exports = connection
