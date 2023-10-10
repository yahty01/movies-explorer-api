const NotFoundError = require('../errors/not-found-err');

module.exports = (req, res, next) => {
  const err = new NotFoundError('Данный ресурс не найден');
  next(err);
};
