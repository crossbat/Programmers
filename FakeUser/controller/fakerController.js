const { StatusCodes } = require('http-status-codes');
const maker = require('../models/maker');

const FakeuserMaker = (req, res) => {
  let fakersNum = req.params.num;
  fakersNum = parseInt(fakersNum);
  try {
    const results = maker(fakersNum);
    if (results.length > 0) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = FakeuserMaker
