/** @module models/Ingredient **/
'use strict';

const mongoose = require('mongoose');

/** @constructor
* @augments IngredientSchemaInstance
* @param {Object} definition
*/

const IngredientSchema = new mongoose.Schema({
  name : { type: String, required:true},
  quantity : {type:String, required:true}
});

mongoose.model('Ingredient', IngredientSchema);
