const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models');
const Recipe = mongoose.model('Recipe');
const config = require('../config')
const fieldsFilter = {'__v' : 0};
var unirest = require('unirest');

router.get('/', function(req, res, next) {
  let name = req.query.name;
  let ingredients = req.query.ingredient;
  let restUrl = "excludeIngredients="+ingredients;

  if(req.query.diet){
    restUrl = "diet=vegan&" + restUrl
  }

  if(req.query.intolerances){
    restUrl += "&intolerances=" + req.query.intolerances;
  }

  restUrl += "&number=100&offset=0&query="+name;

  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?" + restUrl)
    .header("X-Mashape-Key", "gAlLXPZyJsmshAGu1ZMh0jlusuoVp1e9WKZjsnUUFxeSibN4A9")
    .header("Accept", "application/json")
    .end(function (result) {
      res.send(result.body);
    });
});

module.exports = router;
