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
  bumped_on: {type: Date, required: true},
  delete_password: {type: String, required: true},
  reported: {type: Boolean},
  replies: [replySchema]
});

const Thread = mongoose.model('Thread', threadSchema);


module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .get(function(req, res){
    Thread.find(
      {board: req.params.board},
      'text created_on bumped_on replies ',
      {sort: {'bumped_on': -1}, limit: 10},
      function(err, doc){
        if(err){console.error(err)};

        const newThreadArray = doc.map(reduceThreeRecentReplies;

        console.log(newThreadArray);
        res.json(newThreadArray);
      }
    )
    })
    
    .post(function (req, res) {
      const newThread = new Thread({
        board: req.body.board,
        text: req.body.text,
        created_on: now,
        bumped_on: now,
        delete_password: req.body.delete_password
      })

      newThread.save(function(err, doc){
        console.log(`saved newThread in`);
        console.log(doc);
        res.redirect(302, `/b/${req.params.board}`)
      })


      
    });
  
  app.route('/api/replies/:board');
  

  //function to reduce thread to 3 most recent replies
  function reduceThreeRecentReplies(thread) {
    thread.replies.sort(function(a,b){
      return new Date(b.created_on) - new Date(a.created_on);
    });
  
    thread.replies = thread.replies.slice(0, 3);
    
    return thread;
    
  }
};


