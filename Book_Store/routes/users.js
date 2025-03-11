const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const conn = require('../database');

const { join, login, reset_request, reset_password } = require('../controller/UserController');

dotenv.config();

const validate = (req, res, next) => {
  const err = validationResult(req)
  if (err.isEmpty()) {
    return next()
  } else {
    res.status(400).json(err.array());
  }
}

router.use(express.json());

router.route('/join').post([
  body('email').notEmpty().isString().isEmail().withMessage('이메일 형식을 확인해주세요'),
  body('password').notEmpty().withMessage('비밀번호를 다시 확인해주세요'),
  validate], join);

router.route('/login').post([
  validate], login);

router.route('/reset')
  .post([
    validate
  ], reset_request)
  .put([
    validate
  ], reset_password)

module.exports = router;
