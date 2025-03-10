const express = require('express');
const { body, param, validationResult, validate } = require('express-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.route('/').get((req, res) => {
  res.json('main page');
});

router.route('/books').get((req, res) => {
  res.json('all book');
});

router.route('/books/:bookId').get((req, res) => {
  res.json('specific book');
});

module.exports = router;
