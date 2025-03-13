const express = require('express');
const router = express.Router();
const allCategories = require('../controller/CategoryController')

router.route('/').get(allCategories);

module.exports = router;

