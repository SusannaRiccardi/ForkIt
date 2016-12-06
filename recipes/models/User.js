/** @module models/User **/
'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/** @constructor
* @augments UserSchemaInstance
* @param {Object} definition
*/

const UserSchema = new mongoose.Schema({
  username : { type: String, required:true},
  password : {type:String, required:true}
});

mongoose.model('User', UserSchema);
