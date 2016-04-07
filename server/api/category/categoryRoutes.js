var router = require('express').Router();
var logger = require('../../util/logger');
var category = require('./categoryController');

// setup boilerplate route just to satisfy a request
// for building
router.param('id', category.params);

router.route('/')
    .get(category.get)
    .post(category.post)

router.route('/:id')
    .get(category.getOne)
    .put(category.put)
    .delete(category.delete)

module.exports = router;
