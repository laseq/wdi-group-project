const Group = require('../models/group');

function groupsIndex(req, res, next) {
  Group
    .find()
    .exec()
    .then(groups => {
      return res.status(200).json(groups);
    })
    .catch(next);
}

function groupsCreate(req, res) {
  Group
    .create(req.body)
    .then(group => {
      console.log('req.body inside groupsCreate:', req.body);
      res.status(201).json(group);
    })
    .catch(err => res.status(500).json(err));
}

function groupsShow(req, res, next) {
  Group
    .findById(req.params.id)
    .exec()
    .then(group => {
      if (!group) {
        const error = new Error('No group was found');
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(group);
    })
    .catch(next);
}

module.exports = {
  index: groupsIndex,
  create: groupsCreate,
  show: groupsShow
};
