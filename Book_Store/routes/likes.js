const express = require('express');
const { body, param, validationResult, validate } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { route } = require('./users');
dotenv.config();

router.use(express.json());

router.route('/:bookId').post((req, res) => {
  res.json('좋아요 눌렀음');
}).delete((req, res) => {
  res.json('좋아요 취소했음')
})

module.exports = router;
