require('dotenv').config()
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect(`mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD_MLAB}@ds211694.mlab.com:11694/ardysusanto`, { useNewUrlParser: true })
const router = require('./routes/index.js');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(3001, () => {
  console.log('Server listen on port 3001')
})