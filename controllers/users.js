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

function usersShow(req, res, next) {
  User
  .findById(req.params.id)
  .exec()
  .then(user => {
    if (!user) {
      const error  = new Error('No user was found');
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(user);
  })
  .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
