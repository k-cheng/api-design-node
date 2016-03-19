// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions', function(req, res) {
    res.json(lions)
});

app.get('/lions/:id', function(req, res) {
    var lion = _.find(lions, {id: req.params.id});
    res.json(lion);
})

app.post('/lions', function(req, res) {
    console.log('REQUEST BODY: ', req.body);
    var lion = req.body;
    id++;
    lion.id = id.toString();
    lions.push(lion);
    res.json(lions);
});

app.put('/lions/:id', function(req, res) {
    var update = req.body;
    // SAFETY CHECK, in case you want to update the id, so you don't have two
        // of the same id.
    if (update.id) {
        delete update.id
    }
    for (var i = 0; i < lions.length; i++) {
        if (req.params.id != lions[i].id) {
            res.send();
        } else {
            var updatedLion = _.assign(lions[i], update);
            res.json(updatedLion);
        }
    }
    
    // given the id that is sent, check if that lion exists.
        // findIndex will return the index of the lion if it exists

    // var lion = _.findIndex(lions, {id: req.params.id})

    // if the lion does not exist, send nothing
    // if (!lions[lion]) {
    //     res.send();
    // } else {
    //     var updatedLion = _.assign()
    // }
    // var updatedLion = _.assign(req.params.id, update);
    // res.json(updatedLion);
});

app.delete('/lions/:id', function(req, res) {
    var lion = _.findIndex(lions, {id: req.params.id});
    if (!lions[lion]) {
        res.send()
    } else {
        var deletedLion = lions[lion];
        lions.splice(lion, 1);
        res.json(deletedLion)
    }
})

app.listen(3000);
console.log('on port 3000');
