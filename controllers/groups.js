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

module.exports = {
  index: groupsIndex
};
