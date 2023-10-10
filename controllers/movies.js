const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  NO_DELETE_PERMISSION,
  MOVIE_NOT_FOUND,
  BAD_REQUEST,
} = require('../helpers/errorMessages');

// Обработка ошибок Mongoose
const handleMongooseError = (err, next) => {
  if (err instanceof ValidationError || err instanceof CastError) {
    next(new BadRequestError(BAD_REQUEST));
  } else {
    next(err);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(201).send(movie);
  } catch (err) {
    handleMongooseError(err, next);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
                              .orFail(new NotFoundError(MOVIE_NOT_FOUND));
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(NO_DELETE_PERMISSION);
    }

    const deletedMovie = await movie.deleteOne();
    res.send(deletedMovie);
  } catch (err) {
    handleMongooseError(err, next);
  }
};


module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};