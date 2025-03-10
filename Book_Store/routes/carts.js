const express = require('express');
const { body, param, validationResult, validate } = require('express-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.route('/').post((req, res) => {
  res.json('장바구니 담기');
})
  .get((req, res) => {
    res.json('장바구니 조회하기');
  });

router.route('/:cartId').delete((req, res) => {
  res.json('장바구니 요소 삭제하기')
})

module.exports = router;
