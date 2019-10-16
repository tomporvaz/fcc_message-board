/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

//connect to database using mongoose
mongoose.connect(process.env.DB)

//from quick start guide in mongoose docs
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function (){
  console.log("DB sucess using mongoose!");
});

//thread schema and model
const threadSchema = new Schema({
  board: {type: String, required: true},
  text: {type: String, required: true},
  created_on: {type: Date, required: true},
  bumbed_on: {type: Date, required: true},
  delete_password: {type: String, required: true},
  reported: {type: Boolean},
  replies: [replySchema]
});

const Thread = mongoose.model('Thread', threadSchema);

//reply schema and model
const replySchema = new Schema({
  text: {type: String, required: true},
  thread_id: {type: Schema.Types.ObjectId},
  created_on: {type: Date},
  updated_on: {type: Date},
  delete_password: {type: String},
  reported: {type: Boolean}
});

const Reply = mongoose.model('Reply', replySchema);



module.exports = function (app) {
  
  app.route('/api/threads/:board');
  
  app.route('/api/replies/:board');
  
};
