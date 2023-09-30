require('dotenv').config();

const {
  NODE_ENV, PORT, MONGODB_URL, JWT_SECRET,
} = process.env;

module.exports = {
  port: NODE_ENV === 'production' ? PORT : 3000,
  mongoURL:
    NODE_ENV === 'production'
      ? MONGODB_URL
      : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  secretKey:
    NODE_ENV === 'production'
      ? JWT_SECRET
      : '3889720fafc60526a65ca686d65cd06faee48e4d1c66e87e23ad0c7052083a58',
};
