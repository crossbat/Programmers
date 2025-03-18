const conn = require('../database')
const { StatusCodes } = require('http-status-codes');

const addOrders = (req, res) => {
  const { items, firstBookTitle, delivery, totalCount, totalPrice, user_id } = req.body;
  let delivery_id = 3;
  let order_id = 2;
  let sql = 'INSERT INTO orders(book_title, total_count, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
  let value = [firstBookTitle, totalCount, totalPrice, user_id, delivery_id];
  //  conn.query(sql, value, (err, results) => {
  //    if (err) {
  //      console.log(err);
  //      return res.status(StatusCodes.BAD_REQUEST).end();
  //    }

  //    order_id = results.insertId;
  //    console.log(order_id);
  //    return res.status(StatusCodes.CREATED).json(results);
  //  })

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
