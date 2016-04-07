var router = require('express').Router();
var logger = require('../../util/logger');
var user = require('./userController');

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', user.params);

router.route('/')
    .get(user.get)
    .post(user.post)

router.route('/:id')
    .get(user.getOne)
    .put(user.put)
    .delete(user.delete)

module.exports = router;
