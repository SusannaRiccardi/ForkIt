var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Recipe.find(function(err, found) {
    if (err) {
      throw err
    }

    for (let obj of found) {
      obj.href = '/recipes/' + obj._id;
    }
    let recipes = {'recipes' : found};
    res.render('layout', )

  })
});

module.exports = router;
