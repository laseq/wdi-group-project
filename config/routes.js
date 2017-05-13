const router = require('express').Router();
const users   = require('../controllers/users');

router.route('/users')
.get(users.index);

router.route('/users/:id')
.get(users.show);

module.exports = router;
