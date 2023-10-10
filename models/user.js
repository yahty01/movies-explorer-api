const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-err');
const { AUTH_ERROR } = require('../helpers/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Что-то пошло не так...',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthError(AUTH_ERROR);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AuthError(AUTH_ERROR);
  }

  return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
