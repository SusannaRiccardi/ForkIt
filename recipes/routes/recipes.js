const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models');
const Recipe = mongoose.model('Recipe');
const config = require('../config')
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

    let recipes = {'recipes' : found}
    console.log(recipes.recipes);
    res.render('recipes', {title : "Recipes", message : recipes});
  })
});

// Get /recipes/_id -- Get for single recipe view
router.get('/:recipeid', function(req, res) {
  Recipe.findById(req.params.recipeid, fieldsFilter).lean().populate('recipe').exec(function(err, recipe) {
    if (err) {
      throw err
    }
    if (!recipe) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
    } else {
      addLinks(recipe);
      res.render('recipe', {title : "Recipe", message : recipe});
    }
  })
})

// Post /recipes
router.post('/', function(req, res) {
  videoNew = req.body.video || "";
  imageNew = req.body.video || "";
  const newRecipe = new Recipe({
    title : req.body.title,
    instructions : req.body.instructions,
    ingredients : req.body.ingredients,
    video : videoNew,
    image : imageNew
  });
  newRecipe.save(function(err, saved) {
    if (err) {
      throw err
    }
    console.log(saved);
    res.json(saved);
  })
})

router.delete('/:recipeid', function(req, res, next) {
  Recipe.findById(req.params.recipeid, fieldsFilter , function(err, recipe){
    if (err) return next (err);
    if (!recipe) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    recipe.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});


function addLinks(recipe) {
  recipe.links = [
    {
      "rel" : "self",
      "href" : config.url + "/recipes/" + recipe._id
    }
  ];
}

module.exports = router;
