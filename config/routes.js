const router = require('express').Router();
const users   = require('../controllers/users');

router.route('/users')
.get(users.index);

module.exports = router;
