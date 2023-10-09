const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // Максимально 100 запросов с одного IP
  message: 'Это что DDoS? (-__-)',
});

module.exports = limiter;
