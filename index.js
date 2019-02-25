var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://root:O7DgnKqSqCFmvC6n@tests-0eeni.mongodb.net/test');

var usersRoutes = require('./api/routes/usersRoutes')

app.use('/users', usersRoutes);

app.listen(port);

console.log('MoaDW test API server started on: ' + port);
