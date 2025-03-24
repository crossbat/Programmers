const { StatusCodes } = require('http-status-codes');
const auth = require('../Authorization.js');
const jwt = require('jsonwebtoken');
const authorization = require('../Authorization.js');

const addOrders = async (req, res) => {
  const mysql = require('mysql2/promise')
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'BookStore',
    password: '0560',
    dateStrings: true
  });

  const auth = auth(req);
  const { items, firstBookTitle, delivery, totalCount, totalPrice } = req.body;

  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션인 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    });
  } else {
    let sql = 'INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)'
    let value = [delivery.address, delivery.receiver, delivery.contact]
    let [results] = await conn.execute(sql, value);

    let delivery_id = results.insertId;

    sql = 'INSERT INTO orders(book_title, total_count, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
    value = [firstBookTitle, totalCount, totalPrice, auth.id, delivery_id];
    [results] = await conn.execute(sql, value)

    let order_id = results.insertId

    sql = 'SELECT book_id, count FROM cartItems WHERE id IN (?)'
    let [order_items, fields] = await conn.query(sql, [items]);
    sql = 'INSERT INTO ordered_books(order_id, book_id, count) VALUES ?'
    value = [];
    order_items.forEach((item) => {
      value.push([order_id, item.book_id, item.count]);
    })
    results = await conn.query(sql, [value])

    results = await delete_cart_items(conn, items);

    return res.status(StatusCodes.OK).json(results)
  }
}

const delete_cart_items = async (conn, items) => {
  let sql = 'DELETE FROM cartItems WHERE id IN (?)'

  let results = await conn.query(sql, [items])
  return results
}

const viewOrders = async (req, res) => {
  let auth = authorization(req);
  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션인 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    });
  } else {
    const mysql = require('mysql2/promise')
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      database: 'BookStore',
      password: '0560',
      dateStrings: true
    });

    let sql = 'SELECT orders.id, book_title, total_count, total_price, address, receiver, contact FROM orders LEFT JOIN deliveries ON orders.delivery_id = deliveries.id';

    let [rows, fields] = await conn.query(sql)
    return res.status(StatusCodes.OK).json(rows)
  }
}

const eachOrder = async (req, res) => {
  const { id } = req.params
  let auth = authorization(req);
  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션인 만료되었습니다'
    });
  } else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 값이 조작되었거나 옳지 않습니다.'
    });
  } else {
    const mysql = require('mysql2/promise')
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      database: 'BookStore',
      password: '0560',
      dateStrings: true
    });

    let sql = 'SELECT book_id, title, author, price, count from ordered_books left join books on ordered_books.book_id = books.id where order_id = ?';

    let [rows, fields] = await conn.query(sql, [id])
    return res.status(StatusCodes.OK).json(rows)
  }
}

module.exports = {
  addOrders,
  viewOrders,
  eachOrder
}
