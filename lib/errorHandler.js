/* eslint-disable no-unused-vars */

function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV === 'production') {
    delete err.stack; // remove stack trace in production
  }
  return res.status(err.status).json({ message: err.message });
}

module.exports = errorHandler;
