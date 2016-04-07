var router = require('express').Router();
var logger = require('../../util/logger');
var post = require('./postController');

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', post.params);

router.route('/')
    .get(post.get)
    .post(post.post)

router.route('/:id')
    .get(post.getOne)
    .put(post.put)
    .delete(post.delete)


module.exports = router;
