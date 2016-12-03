// This is just something to start. As soon as we have a more complete website, the routes will be adapted.

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models');
const Recipe = mongoose.model('Recipe');
const fieldsFilter = {'__v' : 0};

/* GET users listing. */
router.get('/', function(req, res, next) {
  Recipe.find(function(err, found) {
    if (err) {
      throw err
    }
    // Add href.
    for (let obj of found) {
      addLinks(obj);
    }

    let recipes = {'recipes' : found};
    // htmlOrJson(req, res, recipes, 'recipes');
  })
});

// Get /recipes/_id -- Get for single recipe view
router.get('/:recipeid', function(req, res) {
  Recipe.findByID(req.params.recipe, fieldsFilter).lean().populate('recipe').exec(function(err, recipe) {
    if (err) {
      throw err
    }
    if (!recipe) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      addLinks(recipe);
      // htmlOrJson(req, res, recipe, 'recipes')
    }
  })
})

// Post /recipes
router.post('/', function(req, res) {
  // TODO: Take all fields for new recipe.
  const newRecipe = new Recipe({
    title: req.body.title,
    description: req.body.description
  });
  newRecipe.save(function(err, saved) {
    if (err) {
      throw err
    }
    res.json(saved);
  })
})

// Function to decide how to render the view.
function htmlOrJson(req, res, data, viewName) {
  if (req.accepts('html')) {
    res.render(viewName, data);
  } else {
    res.json(data);
  }
}

function addLinks(recipe) {
  recipe.links = [
    {
      "rel" : "self",
      "href" : config.url + "/recipes/" + recipe._id
    }
  ];
}

module.exports = router;
