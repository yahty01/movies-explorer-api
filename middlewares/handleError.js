const httpConstants = require('http2').constants;

const defaultErrMessage = 'На сервере произошла ошибка';

const errorHandlerMiddleware = (err, req, res, next) => {
  let { statusCode, message } = err;
  // Использовать ошибку по умолчанию, если код состояния не был задан
  statusCode = statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  // Если это серверная ошибка и нет внятного сообщения, используем дефолтное сообщение
  if (statusCode === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR && !message) {
    message = defaultErrMessage;
  }

  res.status(statusCode).send({
    message
  });

  next();
};

module.exports = errorHandlerMiddleware;
