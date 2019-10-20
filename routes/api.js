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

const now = new Date();

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


module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .get(function(req, res){
    Thread.find(
      {board: param.board},
      'text created_on bumbed_on replies ',
      {sort: 'bumbed_on', limit: 10},
      function(err, doc){
        if(err){console.error(err)};
        console.log(doc);
      }
    )
    })
    
    .post(function (req, res) {
      const newThread = new Thread({
        board: param.board,
        text: req.query.text,
        created_on: now,
        bumbed_on: now,
        delete_password: req.query.delete_password
      })

      newThread.save(function(err, doc){
        console.log(`saved newThread in`);
        console.log(doc);
        res.redirect(302, `./b/${param.board}`)
      })


      
    });
  
  app.route('/api/replies/:board');
  
};
