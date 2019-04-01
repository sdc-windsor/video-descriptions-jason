const express = require('express');
const app = express();
const Description = require('../database/index').Description;
const User = require('../database/index').User;
const Comment = require('../database/index').Comment;
const saveComment = require('../database/helper').saveComment;
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize } = require('../db/pg-index.js');
const { readAllComments, readOneComment, createComment, updateComment, deleteComment } = require('./controllers/comments.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));
app.use('/:id', express.static('public'));


/* CRUD - COMMENTS */
app.get('/api/comments', (req, res) => {
  if (req.query.page && req.query.pageSize) {
    readAllComments(req, res);
  } else if (req.query.id) {
    readOneComment(req, res);
  } else {
    res.send('Sorry, those aren\'t the correct params for this route!');
  }
});

app.post('/api/comments', (req, res) => {
  createComment(req, res);
});

app.put('/api/comments', (req, res) => {
  updateComment(req, res);
});

app.delete('/api/comments', (req, res) => {
  deleteComment(req, res);
});

// DESCRIPTION ROUTES
  // app.get('/descriptions')
  // app.get('/descriptions/description_id)
  // app.post('/descriptions')
  // app.put('/descriptions/description_id')
  // app.delete('/descriptions/description_id')

// COMMENTS ROUTES
  // app.get('/comments')
  // app.get('/comments/comment_id)
  // app.post('/comments')
  // app.put('/comments/comment_id')
  // app.delete('/comments/comment_id')

// USERS ROUTES
  // app.get('/users')
  // app.get('/users/user_id)
  // app.post('/users')
  // app.put('/users/user_id')
  // app.delete('/users/user_id')


/* ROUTE 1
Retrieves a description record by video_id.
Used by the getNumOfLikes function in IconTab.jsx */
app.get('/categories/:video_id', function (req, res) {
Description.findOne({video_id: req.params.video_id}).then((data) => {
  res.json(data);
    res.end();
  });
});

/* RESPONSE: {
  "categories": [
      "Travel"
  ],
  "_id": "5c8b1feba0a0f7484fb96ff2",
  "video_id": 5,
  "description": "Omnis reiciendis aut accusamus ut. Saepe expedita nemo voluptates impedit facere atque qui quos temporibus. Qui assumenda nam doloribus excepturi. In quia aut. Et recusandae qui qui repellat corrupti voluptatum voluptas.",
  "likes": 12067057,
  "__v": 0
} */



/* ROUTE 2
Retrieves a user record by user id. Used by the getAuthorImg function in app.jsx
and the getUserInfo function in both AddComment.jsx and Comment.jsx */
app.get('/usersthumbnail/:user_id', function (req, res) {
  User.findOne({_id: req.params.user_id}).then((data) => {
    res.json(data);
    res.end();
  });
});

/* RESPONSE: {
  "_id": "5c8b1feba0a0f7484fb9700f",
  "username": "Rodolfo25",
  "user_thumbnail": "https://s3.amazonaws.com/uifaces/faces/twitter/alecarpentier/128.jpg",
  "__v": 0
} */



/* ROUTE 3
Retrieves a user ID by username. Used by the getAuthorImg function in app.jsx.
The getAuthorImg has two get requests in it: one that gets the id based on the username
(using this route), and one that gets the thumbnail based on the id (using the above route). */
app.get('/userid/:username', function(req,res){
  User.findOne({username: req.params.username}).then((data) => {
    res.json(data._id);
    res.end();
  })
})

/* RESPONSE: "5c8b1feba0a0f7484fb9700f" */



/* ROUTE 4
Retrieves all comment records for a video_id.
Used by the getComments function in CommentsList.jsx
and the getNumOfComponents function in IconTab.jsx. */
app.get('/comments/:video_id', function (req, res) {
  Comment.find({video_id: req.params.video_id}).sort({data:-1}).exec().then((data) => {
    res.json(data);
    res.end();
  });
});

// RESPONSE: [
//   {
//     "_id": "5c8d79a8d8cfe441e8be4552",
//     "video_id": 5,
//     "user_id": "5c8b1feba0a0f7484fb96feb",
//     "comment": "Sed officia dolores nulla voluptas. Aliquam maxime quo dolores aliquid ea corporis cupiditate. Reprehenderit natus est sed. Rerum placeat asperiores dolores laborum velit fuga consequatur. Odio est voluptatum neque asperiores sint autem sed ut est.",
//     "date": "2018-09-19T17:44:44.339Z",
//     "__v": 0
//   },
//   {
//     "_id": "5c8d79a8d8cfe441e8be4555",
//     "video_id": 5,
//     "user_id": "5c8b1feba0a0f7484fb96fee",
//     "comment": "Eos quo aliquid quos omnis temporibus totam harum voluptas consectetur. Reiciendis non accusantium quisquam aperiam qui nihil.",
//     "date": "2018-08-06T07:14:59.160Z",
//     "__v": 0
//   },
// ]



/* ROUTE 4A
Inserts a comment. Used by the sendComment function in CommentsList.jsx */
app.post('/comments/:video_id', function (req, res) {
  console.log('REQ BODY', req.body);
  saveComment(req.body.video_id, req.body.user_id, req.body.comment, req.body.date, ()=>{
    console.log('Saved comment to database')
    res.send('Saved comment to database');
    res.end();
  })
});



/* ROUTE 5
Identical to Route 1. Used by the getDetail function in app.jsx. */
app.get('/details/:video_id', function (req, res) {
  Description.find({video_id: req.params.video_id}).then((data) => {
    res.json(data);
    res.end();
  })
});



/* ROUTE 6
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


module.exports = app;

