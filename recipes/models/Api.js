/** @module models/Api **/
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const CommentSchema = require("./Comment");

/** @constructor
* @augments ApiSchemaInstance
* @param {Object} definition
*/

const ApiSchema = new mongoose.Schema({
  id : { type: String, required:true},
  upvotes : {type: Number, default: 0},
  downvotes : {type: Number, default: 0},
  comments : {type: [CommentSchema]},
});

mongoose.model('Api', ApiSchema);
