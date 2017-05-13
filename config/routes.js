const router = require('express').Router();
const groups = require('../controllers/groups');

router.route('/groups')
  .get(groups.index);

router.route('/groups/:id')
  .get(groups.show);

module.exports = router;
