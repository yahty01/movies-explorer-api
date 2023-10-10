const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = AuthError;
