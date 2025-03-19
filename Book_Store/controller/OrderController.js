const { StatusCodes } = require('http-status-codes');

const addOrders = async (req, res) => {
  const mysql = require('mysql2/promise')
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'BookStore',
    password: '0560',
    dateStrings: true
  });

  const { items, firstBookTitle, delivery, totalCount, totalPrice, user_id } = req.body;
  let delivery_id;
  let order_id;

  let sql = 'INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)'
  let value = [delivery.address, delivery.receiver, delivery.contact]
  let [results] = await conn.query(sql, value);

  console.log(results)

  sql = 'INSERT INTO orders(book_title, total_count, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  value = [firstBookTitle, totalCount, totalPrice, user_id, delivery_id];
  conn.query(sql, value, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    order_id = results.insertId;
  })

  sql = 'INSERT INTO ordered_books(order_id, book_id, count) VALUES ?'
  value = [];
  items.forEach((item) => {
    value.push([order_id, item.book_id, item.count]);
    console.log(value)
  })
  conn.query(sql, [value], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.CREATED).json(results)
  })
}

const viewOrders = (req, res) => {
  res.json('결제 내역 조회');
}

const eachOrder = (req, res) => {
  res.json('주문 상세조회')
}

module.exports = {
  addOrders,
  viewOrders,
  eachOrder
}
