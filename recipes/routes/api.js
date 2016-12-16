const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
require('../models');
const Api = mongoose.model('Api');
const config = require('../config')
const fieldsFilter = {'__v' : 0};

router.get('/:id', function(req, res) {
  let id = req.params.id;
  Api.find({'recipeid':id}, function(err, results) {
    if (err || results === undefined) {
      const newApi = new Api({
        recipeid : id
      })
      newApi.save(function(err) {
        if (err) {
          res.status(400);
        } else {
          res.status(201);
          res.send([newApi]);
        }
      })
    } else if (results.length > 0) {
      res.send(results);
    } else {
      const newApi = new Api({
        recipeid : id
      })
      newApi.save(function(err) {
        if (err) {
          res.status(400);
        } else {
          res.status(201);
          res.send([newApi]);
        }
      })
    }
  })
})

//updateRecipe
router.put('/:id', function(req, res, next) {
  const data = req.body;
  let id = req.params.id;
  if((data.upvotes || data.upvotes==0)  && (data.downvotes || data.downvotes==0)){
    Api.find({'recipeid':id}, function(err, recipe) {
      if (err) return next (err);
      if (recipe){
        recipe[0].upvotes = data.upvotes;
        recipe[0].downvotes = data.downvotes;
        recipe[0].save(onModelSave(res));
      }
    });
  }
  if(data.upvotes || data.upvotes==0){
    Api.find({'recipeid':id}, function(err, recipe) {
      if (err) return next (err);
      if (recipe){
        recipe[0].upvotes = data.upvotes;
        recipe[0].save(onModelSave(res));
      }
    });
  }
  if(data.downvotes || data.downvotes==0){
    Api.find({'recipeid':id}, function(err, recipe) {
      if (err) return next (err);
      if (recipe){
        recipe[0].downvotes =  data.downvotes;

        recipe[0].save(onModelSave(res));
      }
    });
  }
  if(data.comment){
    Api.find({'recipeid':id}, function(err, recipe) {
      if (err) return next (err);
      if (recipe){
        recipe[0].comments.push(data);

        recipe[0].save(onModelSave(res));
      }
    });
  }
  res.send();
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


module.exports = router;
