const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const notFound = require('./middlewares/notFound');
const handleError = require('./middlewares/handleError');
const limiter = require('./middlewares/rateLimiter');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { port, mongoURI } = require('./config');

const app = express();

app.use(helmet());

app.use(
  cors({ origin: ['https://kino.nomoredomainsrocks.ru', 'http://localhost:3000'], credentials: true })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use('*', notFound);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
