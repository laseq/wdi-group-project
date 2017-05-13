const router = require('express').Router();
const groups = require('../controllers/groups');

router.route('/groups')
  .get(groups.index)
  .post(groups.create);

router.route('/groups/:id')
  .get(groups.show);

module.exports = router;
