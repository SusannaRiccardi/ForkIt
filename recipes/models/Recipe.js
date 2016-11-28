/** @module models/Recipe **/
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const IngredientSchema = require("./Ingredient");
const CommentSchema = require("./Comment");

/** @constructor
* @augments RecipeSchemaInstance
* @param {Object} definition
*/

const RecipeSchema = new mongoose.Schema({
  title : { type: String, required: true},
  image : {type:String, default: ""},
  video : {type:String, default: ""},
  ingredients : {type:[IngredientSchema], default:[]},
  description: {type:String, required:true},
  like : {type:Number, default:0},
  unlike : {type:Number, default:0},
  comments : {type:[CommentSchema], },
});

mongoose.model('Recipe', RecipeSchema);
