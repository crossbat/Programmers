const express = require('express');
const { body, param, validationResult, validate } = require('express-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.route('/').post((req, res) => {
  res.json('결제');
}).get((req, res) => {
  res.json('결제 내역 조회');
});

router.route('/:orderId').get((req, res) => {
  res.json('주문 상세조회')
})


module.exports = router;
