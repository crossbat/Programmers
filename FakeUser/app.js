const express = require('express');
const app = express()
const dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT);

const makeUsers = require('./router/userMaker');

app.use('/fake', makeUsers);
