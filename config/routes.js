const router = require('express').Router();
const groups = require('../controllers/groups');

router.route('/groups')
  .get(groups.index);

module.exports = router;
