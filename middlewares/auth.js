const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  if (!secretKey) {
    throw new Error('Secret key не определен в конфигурации');
  }

  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new AuthError('Токен не предоставлен! Необходима авторизация!'));
  }

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthError(`Токен авторизации недействителен! Ошибка: ${err.message}`));
  }

  req.user = payload;

  return next();
};
