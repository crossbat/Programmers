const express = require('express');
const router = express.Router();
const FakeuserMaker = require('../controller/fakerController');

router.route('/users/:num').get(FakeuserMaker);

module.exports = router;
