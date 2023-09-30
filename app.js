const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { port, mongoURL } = require('./config');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
});

app.use(errors());

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
