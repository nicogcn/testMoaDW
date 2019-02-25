const mongoose = require('mongoose');

var Hat = require('../models/hat');
var User = require('../models/user');

exports.getExpededInHats = async function(req, res) {
  var usersReturn = [];
  const SIZE = 50;
  var page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
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
  console.log(users);
  for (var i = 0; i < users.length; i++) {
    usersReturn.push({
      email: users[i]._id.email,
      expended: users[i].expended
    });
  }
  res.status(200).json({users: usersReturn});
}
