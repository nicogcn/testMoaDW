var express = require('express');
var router = express.Router();

var controller = require("../controllers/usersController");

router.get('/expended-in-hats', controller.getExpededInHats);
router.get('/recommended-hats', controller.getRecommendedHats);

module.exports = router;
