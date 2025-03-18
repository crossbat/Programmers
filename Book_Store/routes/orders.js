const express = require('express');
const { body, param, validationResult, validate } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { addOrders, viewOrders, eachOrder } = require('../controller/OrderController')

dotenv.config();

router.use(express.json());

router.route('/').post(addOrders).get(viewOrders);

router.route('/:orderId').get(eachOrder)


module.exports = router;
