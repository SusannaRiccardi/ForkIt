/** @module models/Comment **/
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/** @constructor
* @augments CommentSchemaInstance
* @param {Object} definition
*/

const CommentSchema = new mongoose.Schema({
  username : { type: String, required:true},
  text : {type:String, required:true}
});

mongoose.model('Comment', CommentSchema);
