const express = require('express');
const app = express();
const Description = require('../database/index').Description;
const User = require('../database/index').User;
const Comment = require('../database/index').Comment;
const saveComment = require('../database/helper').saveComment;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'));
app.use('/:id', express.static('public'));


/* Route 1
Retrieves a description record by video_id.
Used by the getNumOfLikes function in IconTab.jsx */
app.get('/categories/:video_id', function (req, res) {
Description.findOne({video_id: req.params.video_id}).then((data) => {
  res.json(data);
    res.end();
  });
});

/* Route 2
Retrieves a user record by user id. Used by the getAuthorImg function in app.jsx
and the getUserInfo function in both AddComment.jsx and Comment.jsx */
app.get('/usersthumbnail/:user_id', function (req, res) {
  User.findOne({_id: req.params.user_id}).then((data) => {
    console.log('data', data);
    res.json(data);
    res.end();
  })
});

/* Route 3
Retrieves a user ID by username. Used by the getAuthorImg function in app.jsx.
The getAuthorImg has two get requests in it: one that gets the id based on the username
(using this route), and one that gets the thumbnail based on the id (using the above route). */
app.get('/userid/:username', function(req,res){
  User.findOne({username: req.params.username}).then((data) => {
    res.json(data._id);
    res.end();
  })
})

/* Route 4
This route is ONLY used in tests. It doesn't have any connection to the front end. */
app.get('/videosByCategory/:category', function (req, res) {
  const arrayOfCategories = [];
  const splitParams = req.params.category.split(',');
  for (let l = 0; l < splitParams.length; l++) {
    arrayOfCategories.push({
      categories: {
        $regex : new RegExp(`${splitParams[l]}`,'i')
      }
    });
  }
  Description.find({$and: arrayOfCategories})
    .then((data)=>{
      res.json(data);
      res.end();
    });
});

/* Route 5
Retrieves all comment records for a video_id.
Used by the getComments function in CommentsList.jsx
and the getNumOfComponents function in IconTab.jsx. */
app.get('/comments/:video_id', function (req, res) {
  Comment.find({video_id: req.params.video_id}).sort({data:-1}).exec().then((data) => {
    res.json(data);
    res.end();
  });
});

/* Route 6
Identical to Route 1. Used by the getDetail function in app.jsx. */
app.get('/details/:video_id', function (req, res) {
  Description.find({video_id: req.params.video_id}).then((data) => {
    res.json(data);
    res.end();
  })
});

/* Route 7
Inserts a comment. Used by the sendComment function in CommentsList.jsx */
app.post('/comments/:video_id', function (req, res) {
  console.log('REQ BODY', req.body);
  saveComment(req.body.video_id, req.body.user_id, req.body.comment, req.body.date, ()=>{
    console.log('Saved comment to database')
    res.send('Saved comment to database');
    res.end();
  })
});

module.exports = app;

