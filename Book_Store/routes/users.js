const express = require('express');
const { body, param, validationResult, validate } = require('express-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.route('/join').post((req, res) => {
  res.json('join');
});

router.route('/login').post((req, res) => {
  res.json('login');
});

router.route('/reset').post((req, res) => {
  res.json('post : reset');
}).put((req, res) => {
  res.json('put : reset')
})

module.exports = router;
