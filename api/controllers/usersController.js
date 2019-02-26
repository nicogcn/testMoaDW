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
  var page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  var users = await User.find().skip(SIZE * (page - 1)).limit(SIZE).populate('recommendedHats');
  //console.log(users);
  var table = '<table>'
  table += '<tr><th>Usuario</th><th>Sombrero 1</th><th>Sombrero 2</th><th>Sombrero 3</th></tr>'
  for (var i = 0; i < users.length; i++) {
    table += '<tr>'
    table += '<td>' + users[i].email + '</td>';
    for (var j = 0; j < users[i].recommendedHats.length; j++) {
      table += '<td>' + users[i].recommendedHats[j].name + '</td>';
    }
    table += '</tr>'
  }
  table += '</table>'
  res.status(200).write(table);
}
