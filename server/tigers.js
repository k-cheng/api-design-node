// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
var _ = require('lodash');
var tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
}

tigerRouter.param('id', function(id, req, res, next) {
    var tiger = _.find(tigers, {id: id});

    if (tiger) {
        req.tiger = tiger;
        next();
    } else {
        next.error(new Error());
    }
})

tigerRouter.get('/', function(req, res) {
    res.json(tigers);
});

tigerRouter.get('/:id', function(req, res) {
    var tiger = req.tiger;
    res.json(tiger);
});

tigerRouter.post('/', function(req, res) {
    var tiger = req.body;
    tigers.push(tiger);
    res.json(tiger);
})

tigerRouter.delete('/:id', function(req, res) {
    var tiger = _.findIndex(tigers, {id: req.params.id});
    tigers.splice(tiger, 1);
    res.json(req.tiger);
})

tigerRouter.put('/:id', function(req, res) {
    var update = req.body;

    if (update.id) {
        delete update.id
    }
    var tiger = _.findIndex(tigers, {id: req.params.id});

    if (!tigers[tiger]) {
        next.error(new Error());
    } else {
        var upatedTiger = _.assign(tigers[tiger], update);
        res.json(updateTiger);
    }
});

module.exports = tigerRouter;