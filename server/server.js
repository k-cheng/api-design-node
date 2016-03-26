var express = require('express');
var app = express();
var api = require('./api/api');

// setup the app middlware
var setupMiddleware = require('./middleware/appMiddlware');
setupMiddleware(app);
// setup the api
app.use('/api', api);

// set up global error handling
app.use(function(err, req, res, next) {
  console.log('a wild error has appeared! ', err.message);
  res.status(500);
})
// export the app for testing
module.exports = app;
