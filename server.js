// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

var jsonData = {count: 12, message: 'hey'};

// GET request to '/'
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

// GET request to send jsonData to '/data'
app.get('/data', function(req, res) {
    res.json(jsonData)
})


app.listen(port, function() {
    console.log('Server listening on http://localhost:', port);
});
