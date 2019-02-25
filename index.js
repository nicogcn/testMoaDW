var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000;

var Hat = require('./api/models/hat');
var User = require('./api/models/user');

mongoose.connect('mongodb+srv://root:O7DgnKqSqCFmvC6n@tests-0eeni.mongodb.net/test');

app.listen(port);

console.log('MoaDW test API server started on: ' + port);
