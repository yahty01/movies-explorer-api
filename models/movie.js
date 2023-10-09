const mongoose = require('mongoose');
const validator = require('validator');

const isUrl = {
  validator: (v) => validator.isURL(v),
  message: 'С сылкой, что то не так',
};

const requiredString = {
  type: String,
  required: true,
};

const movieSchema = new mongoose.Schema({
  country: requiredString,
  director: requiredString,
  duration: {
    type: Number,
    required: true,
  },
  year: requiredString,
  description: requiredString,
  image: {
    type: String,
    required: true,
    validate: isUrl,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: isUrl,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: isUrl,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: requiredString,
  nameEN: requiredString,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
