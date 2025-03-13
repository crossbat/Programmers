const express = require('express');
const router = express.Router();
const { bookMain, bookSearch, eachBook } = require('../controller/BookController')

router.use(express.json());

router.route('/').get(bookMain);

router.route('/books').get(bookSearch);

router.route('/books/:id').get(eachBook);

module.exports = router;
