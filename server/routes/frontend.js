// question: Should I use the same schema for the frontend? I feel like I should. Let's give it a shot and see if it works.
// serve up the bundle.js file at the :id route
// serve up this file at any '/' route, which should go through this list and see if anything applies
// then, it should proceed to the next routes.

var express = require('express');
var router = express.Router();
const { Comment, User } = require ('../../db/pg-index.js');
const { create } = require('../controller.js');
const { getDescription, getUser, getUserId, getCommentsForVideo, getAllDescriptions } = require('../frontend-controller.js');


/* ROUTE 1
Retrieves a description record by video_id.
Used by the getNumOfLikes function in IconTab.jsx */
router.get('/categories/:video_id', (req, res) => {
  getDescription(req, res);
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
router.get('/usersthumbnail/:user_id', (req, res) => {
  getUser(req, res);
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
router.get('/userid/:username', (req, res) => {
  getUserId(req, res);
});

/* RESPONSE: "5c8b1feba0a0f7484fb9700f" */



/* ROUTE 4
Retrieves all comment records for a video_id.
Used by the getComments function in CommentsList.jsx
and the getNumOfComponents function in IconTab.jsx. */
router.get('/comments/:video_id', function (req, res) {
  getCommentsForVideo(req, res);
});

/* RESPONSE: [
  {
    "_id": "5c8d79a8d8cfe441e8be4552",
    "video_id": 5,
    "user_id": "5c8b1feba0a0f7484fb96feb",
    "comment": "Sed officia dolores nulla voluptas. Aliquam maxime quo dolores aliquid ea corporis cupiditate. Reprehenderit natus est sed. Rerum placeat asperiores dolores laborum velit fuga consequatur. Odio est voluptatum neque asperiores sint autem sed ut est.",
    "date": "2018-09-19T17:44:44.339Z",
    "__v": 0
  },
  {
    "_id": "5c8d79a8d8cfe441e8be4555",
    "video_id": 5,
    "user_id": "5c8b1feba0a0f7484fb96fee",
    "comment": "Eos quo aliquid quos omnis temporibus totam harum voluptas consectetur. Reiciendis non accusantium quisquam aperiam qui nihil.",
    "date": "2018-08-06T07:14:59.160Z",
    "__v": 0
  },
] */



/* ROUTE 4A
Inserts a comment. Used by the sendComment function in CommentsList.jsx */
router.post('/comments/:video_id', (req, res) => {
  create(Comment, req, res);
});



/* ROUTE 5
Identical to Route 1. Used by the getDetail function in app.jsx. */
router.get('/details/:video_id', (req, res) => {
  getAllDescriptions(req, res);
});

module.exports = router;