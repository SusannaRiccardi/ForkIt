const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const formidable = require('formidable');
const url        = require('url');
const path       = require('path');
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

    let recipes = {'results' : found}
    res.send(recipes);
  })
});

// Get /recipes/_id -- Get for single recipe view
router.get('/:recipeid', function(req, res) {
  console.log(req.params.recipeid);
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
      res.send(recipe);
    }
  })
})

// Post /recipes
router.post('/', function(req, res) {
  console.log('POST request received')

  let form = new formidable.IncomingForm();
  console.log('');
	form.parse(req, function(err, fields, files) {

    const newRecipe = new Recipe({
      title : fields['title'],
      instructions : fields['instructions'],
      ingredients : fields['ingredients'],
      video : fields['video'] || '',
      image : fields['image'] || '',
      lactosefree : 'TODO',
      glutenfree : 'TODO',
      vegetarian : 'TODO'
    });

    newRecipe.save(function(err, saved) {
      if (err) {
        throw err
      }
      console.log(saved);
      if (newRecipe['image'] !== '') {
        form.uploadDir = "./public/uploads/";
        fs.rename(files.file.path, "./public/uploads/" + saved.id + '.png');
      } 
      res.json(saved);
    })
    
  });	
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
