const mongoose = require('mongoose');

var Hat = require('../models/hat');
var Recommendation = require('../models/recommendation');
var User = require('../models/user');

exports.getExpededInHats = async function(req, res) {
  var usersReturn = [];
  const SIZE = 50;
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var range = req.query.range ? req.query.range : '-1,5000';
  var rangeInit = parseInt(range.split(',')[0]);
  var rangeEnd = parseInt(range.split(',')[1]);

  var users = await User.aggregate([{
      $lookup: {
        from: 'hats',
        localField: 'hats',
        foreignField: '_id',
        as: 'hats'
      }
    },
    {
      $unwind: '$hats'
    },
    {
      $group: {
        _id: {
          email: '$email'
        },
        expended: {
          $sum: {
            $toInt: '$hats.price'
          }
        }
      }
    },
    {
      $match: {
        expended: {
          $gt: rangeInit,
          $lt: rangeEnd
        }
      }
    },
    {
      $sort: {
        expended: -1
      }
    },
    {
      $skip: SIZE * (page - 1)
    },
    {
      $limit: SIZE
    }
  ]);
  for (var i = 0; i < users.length; i++) {
    usersReturn.push({
      email: users[i]._id.email,
      expended: users[i].expended
    });
  }
  res.status(200).json({
    users: usersReturn
  });
}

exports.getRecommendedHats = async function(req, res) {
  const SIZE = 50;
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var users = await User.find().skip(SIZE * (page - 1)).limit(SIZE).populate('recommendedHats');
  var table = '<h1>RECOMENDACIONES</1>'
  for (var i = 0; i < users.length; i++) {
    table += '<h3>' + users[i].email + '</h3>';
    table += '<table>'
    table += '<tr><th>Sombrero</th><th>Material</th><th>Precio</th></tr>'
    for (var j = 0; j < users[i].recommendedHats.length; j++) {
      table += '<tr>'
      table += '<td>' + users[i].recommendedHats[j].name + '</td>';
      table += '<td>' + users[i].recommendedHats[j].material + '</td>';
      table += '<td>' + users[i].recommendedHats[j].price + '</td>';
      table += '</tr>'
    }
    table += '</table>'
  }
  res.status(200).write(table);
}
