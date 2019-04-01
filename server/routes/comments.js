var express = require('express');
var router = express.Router();
const { readAllComments, readOneComment, createComment, updateComment, deleteComment } = require('../controllers/comments.js');


router.get('/', (req, res) => {
  if (req.query.page && req.query.pageSize) {
    readAllComments(req, res);
  } else if (req.query.id) {
    readOneComment(req, res);
  } else {
    res.send('Sorry, those aren\'t the correct params for this route!');
  }
});

router.post('/', (req, res) => {
  createComment(req, res);
});

router.put('/', (req, res) => {
  updateComment(req, res);
});

router.delete('/', (req, res) => {
  deleteComment(req, res);
});

module.exports = router;