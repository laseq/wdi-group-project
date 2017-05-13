const User = require('../models/user');

function usersIndex(req, res, next) {
  User
  .find()
  .exec()
  .then(users => {
    return res.status(200).json(users);
  })
  .catch(next);
}

module.exports = {
  index: usersIndex
};
