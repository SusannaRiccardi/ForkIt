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
  let ingredients = req.query.ingredient || "";
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?excludeIngredients="+ingredients+"&number=100&offset=0&query="+name)
    .header("X-Mashape-Key", "gAlLXPZyJsmshAGu1ZMh0jlusuoVp1e9WKZjsnUUFxeSibN4A9")
    .header("Accept", "application/json")
    .end(function (result) {
      res.send(result.body);
    });
});



// unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegan&excludeIngredients=sugar&intolerances=dairy%2C+gluten&number=100&offset=0&query=cake")
// .header("X-Mashape-Key", "gAlLXPZyJsmshAGu1ZMh0jlusuoVp1e9WKZjsnUUFxeSibN4A9")
// .header("Accept", "application/json")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });



module.exports = router;
