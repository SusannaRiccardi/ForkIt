/** @module models/Recipe **/
'use strict';

const mongoose = require('mongoose');
const IngredientSchema = require("./Ingredient");
const CommentSchema = require("./Comment");

/** @constructor
 * @augments RecipeSchemaInstance
 * @param {Object} definition
 */

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    //author: { type: String, required: true },
    image: { type: String, default: "" },
    video: { type: String, default: "" },
    ingredients: { type: [IngredientSchema] },
    instructions: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: { type: [CommentSchema] },
    lactosefree : {type: Boolean, default: false},
    glutenfree : {type: Boolean, default: false},
    vegetarian : {type: Boolean, default: false},
    category : {type: String, enum: [greek, british, indian, japanese, chinese, thai, italian, mexican, french, swiss, spanish, middleeast]}
});

mongoose.model('Recipe', RecipeSchema);
