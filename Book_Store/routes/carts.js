const express = require('express');
const { body, param, validationResult, validate } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { addCart, viewCart, deleteCart } = require('../controller/CartItemController')

router.use(express.json());

router.route('/')
  .post(addCart)
  .get(viewCart);

router.route('/:cart_id').delete(deleteCart)

module.exports = router;
