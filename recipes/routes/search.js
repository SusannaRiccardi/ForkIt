const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models');
const Recipe = mongoose.model('Recipe');
const config = require('../config')
const fieldsFilter = {'__v' : 0};
var unirest = require('unirest');

router.get('/', function(req, res, next) {
  console.log(req.body);
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=chinese&limitLicense=false&number=100&offset=0&query=chinese")
  .header("X-Mashape-Key", "gAlLXPZyJsmshAGu1ZMh0jlusuoVp1e9WKZjsnUUFxeSibN4A9")
  .header("Accept", "application/json")
  .end(function (result) {
    res.send(result.body);
    console.log(result.body);
  });
});

module.exports = router;
