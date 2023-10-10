const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('mongoose').Error;
const { secretKey } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const { CONFLICT, USER_NOT_FOUND, BAD_REQUEST } = require('../helpers/errorMessages');

// Обработка ошибок Mongoose
const handleMongooseError = (err, next) => {
  if (err instanceof ValidationError) {
    next(new BadRequestError(BAD_REQUEST));
  } else if (err.code === 11000) {
    next(new ConflictError(CONFLICT));
  } else {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('email name').orFail(new NotFoundError(USER_NOT_FOUND));
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const update = { email, name };
    const options = { new: true, runValidators: true };
    const updatedUser = await User
      .findByIdAndUpdate(req.user._id, update, options)
      .orFail(new NotFoundError(USER_NOT_FOUND));
    res.send(updatedUser);
  } catch (err) {
    handleMongooseError(err, next);
  }
};


const setJwtCookie = (res, userId) => {
  const token = jwt.sign({ _id: userId }, secretKey, { expiresIn: '7d' });
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 * 24 * 7, sameSite: 'none', secure: true });
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    setJwtCookie(res, user._id);
    res.status(201).send({ _id: user._id, email: user.email, name: user.name });
  } catch (err) {
    handleMongooseError(err, next);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    setJwtCookie(res, user._id);
    res.send({ _id: user._id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

const signout = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }).json({ message: 'Вы успешно вышли' });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
  signout,
};
