const express = require('express');
const router = express.Router();
const { bookSearch, eachBook } = require('../controller/BookController')

router.use(express.json());


router.route('/').get(bookSearch);

router.route('/:id').get(eachBook);

module.exports = router;
