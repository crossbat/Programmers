const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const users = require('./routes/users');
const books = require('./routes/books');
const carts = require('./routes/carts');
const likes = require('./routes/likes');
const orders = require('./routes/orders');
const categories = require('./routes/categories')

app.use('/user', users);
app.use('/books', books);
app.use('/carts', carts);
app.use('/likes', likes);
app.use('/orders', orders);
app.use('/categories', categories);

app.listen(process.env.PORT);
