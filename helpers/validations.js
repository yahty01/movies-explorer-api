const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('./constants');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(128),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(128),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required().min(2),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().pattern(/\d{4}/),
    description: Joi.string().required().min(2),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
  movieId: Joi.string().required().hex().length(24),

  }),
});

module.exports = {
  validateUserCreate,
  validateLogin,
  validateUserInfo,
  validateMovieData,
  validateMovieId,
};
