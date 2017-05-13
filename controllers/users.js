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

function usersCreate(req, res, next) {
  User
  .create(req.body.user)
  .then(user => res.status(201).json(user))
  .catch(next);
}

function usersUpdate(req, res, next) {
  User
  .findByIdAndUpdate(req.params.id, req.body.user, { new: true, runValidators: true })
  .exec()
  .then(user => res.status(200).json(user))
  .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  create: usersCreate,
  update: usersUpdate
};
