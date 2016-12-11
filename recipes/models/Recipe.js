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
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    comments: { type: [CommentSchema] },
    lactosefree : {type: Boolean, default: false},
    glutenfree : {type: Boolean, default: false},
    vegan : {type: Boolean, default: false},
    readyInMinutes : {type: String},
    servings: {type: String},
    category : {type: String, enum: ["greek", "british", "indian", "japanese", "chinese", "thai", "italian", "mexican", "french", "swiss", "spanish", "middleeast"]}
});

mongoose.model('Recipe', RecipeSchema);
