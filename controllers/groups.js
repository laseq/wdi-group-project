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
  show: groupsShow
};
