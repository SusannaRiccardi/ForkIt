/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./Recipe');
require('./Ingredient');
require('./Comment');
require('./User');

module.exports = {
  'Recipe' : mongoose.model('Recipe'),
  'Ingredient' : mongoose.model('Ingredient'),
  'Comment' : mongoose.model('Comment'),
  'User' : mongoose.model('User')
}
