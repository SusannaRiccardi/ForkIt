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

  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {

    const newRecipe = new Recipe({
      title : fields['title'],
      author : fields['author'],
      readyInMinutes : fields['readyInMinutes'],
      instructions : fields['instructions'],
      ingredients : JSON.parse(fields['ingredients']),
      video : fields['video'] || '',
      image : fields['image'] || '',
      lactosefree : fields['lactosefree'],
      glutenfree : fields['glutenfree'],
      vegan : fields['vegan'],
      category : fields['category']
    });

    newRecipe.save(function(err, saved) {
      if (err) {
        throw err
      }
      if (newRecipe['image'] !== './images/cloche.jpg') {
        var dir = './public/uploads/';

        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        form.uploadDir = "./public/uploads/";
        fs.rename(files.file.path, "./public/uploads/" + saved.id + '.' + fields['image']);
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


//updateRecipe
router.put('/:recipeid', function(req, res, next) {
  const data = req.body;
  if((data.upvotes || data.upvotes==0)  && (data.downvotes || data.downvotes==0)){
    Recipe.findById(req.params.recipeid, fieldsFilter , function(err, recipe){
      if (err) return next (err);
      if (recipe){
        recipe.upvotes =  data.upvotes;
        recipe.downvotes = data.downvotes;
        recipe.save(onModelSave(res));
      }
    });
  }
  if(data.upvotes || data.upvotes==0){
    Recipe.findById(req.params.recipeid, fieldsFilter , function(err, recipe){
      if (err) return next (err);
      if (recipe){
        recipe.upvotes =  data.upvotes;

        recipe.save(onModelSave(res));
      }
    });
  }
  if(data.downvotes || data.downvotes==0){
    Recipe.findById(req.params.recipeid, fieldsFilter , function(err, recipe){
      if (err) return next (err);
      if (recipe){
        recipe.downvotes = data.downvotes;

        recipe.save(onModelSave(res));
      }
    });
  }
  if(data.comment){
    Recipe.findById(req.params.recipeid, fieldsFilter , function(err, recipe){
      if (err) return next (err);
      if (recipe){
        recipe.comments.push(data);

        recipe.save(onModelSave(res));
      }
    });
  }
});

function onModelSave(res, status, sendItAsResponse){
  const statusCode = status || 204;
  const sendItAsResponseCheck = sendItAsResponse || false;
  return function(err, saved){
    if (err) {
      if (err.name === 'ValidationError'
      || err.name === 'TypeError' ) {
        res.status(400)
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }else{
        return next (err);
      }
    }
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
