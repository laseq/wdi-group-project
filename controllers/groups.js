const Group = require('../models/group');

function groupsIndex(req, res, next) {
  Group
    .find()
    .populate('admin')
    // .populate(['members'])
    .populate(['comments.user'])
    .exec()
    .then(groups => {
      return res.status(200).json(groups);
    })
    .catch(next);
}

function groupsCreate(req, res, next) {
  if (!req.body.image) {
    req.body.image = 'https://s-media-cache-ak0.pinimg.com/originals/8b/27/87/8b2787a73b7d7e9064be00527c1bfdcd.gif';
  }
  Group
    .create(req.body)
    .then(group => {
      res.status(201).json(group);
    })
    .catch(next);
}

function groupsShow(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('admin')
    .populate(['members'])
    .populate(['comments.user'])
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

function groupsUpdate(req, res, next) {
  if (!req.body.image) {
    req.body.image = 'https://s-media-cache-ak0.pinimg.com/originals/8b/27/87/8b2787a73b7d7e9064be00527c1bfdcd.gif';
  }
  Group
    .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(group => res.status(200).json(group))
    .catch(next);
}

function groupsJoin(req, res, next) {
  Group
    .findByIdAndUpdate(req.params.id, { $addToSet: { members: req.user._id } }, { new: true, runValidators: true })
    .populate('admin')
    .populate(['members'])
    .exec()
    .then(group => res.status(200).json(group))
    .catch(next);
}

function groupsLeave(req, res, next) {
  console.log('req.user._id:', req.user._id);
  Group
    .findByIdAndUpdate(req.params.id, { $pull: { members: req.user._id } })
    .populate('admin')
    .populate(['members'])
    .exec()
    .then(group => {
      res.status(200).json(group);
    })
    .catch(next);
}

function groupsDelete(req, res, next) {
  Group
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: groupsIndex,
  create: groupsCreate,
  show: groupsShow,
  update: groupsUpdate,
  delete: groupsDelete,
  join: groupsJoin,
  leave: groupsLeave
};
