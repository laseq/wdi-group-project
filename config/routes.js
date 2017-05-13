const router = require('express').Router();
const users  = require('../controllers/users');
const groups = require('../controllers/groups');

router.route('/users')
.get(users.index)
.post(users.create);

router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

router.route('/groups')
.get(groups.index)
.post(groups.create);

router.route('/groups/:id')
.get(groups.show);


module.exports = router;
