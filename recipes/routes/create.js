const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models');
const Recipe = mongoose.model('Recipe');
const config = require('../config')
const fieldsFilter = { '__v': 0 };

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('createrecipe', {});
});

module.exports = router;