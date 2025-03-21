const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { addLikes, deleteLikes } = require('../controller/LikeController')
dotenv.config();

router.use(express.json());

router.route('/:BookId')
  .post(addLikes)
  .delete(deleteLikes)

module.exports = router;
