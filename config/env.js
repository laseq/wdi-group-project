module.exports = {
  env: process.env.NODE_ENV,
  db: {
    production: process.env.MONGODB_URI,
    development: `mongodb://localhost/runch-development`,
    test: `mongodb://localhost/runch-test`
  }
};
