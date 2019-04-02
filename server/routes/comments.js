const express = require('express');
const router = express.Router();
const { Comment } = require ('../../db/pg-index.js');
const { readAll, readOne, create, update, deleteRecord } = require('../controllers/crud.js');


router.get('/', (req, res) => {
  if (req.query.page && req.query.pageSize) {
    readAll(Comment, req, res);
  } else if (req.query.id) {
    readOne(Comment, req, res);
  } else {
    res.send('Sorry, those aren\'t the correct params for this route!');
  }
});

router.post('/', (req, res) => {
  create(Comment, req, res);
});

router.put('/', (req, res) => {
  update(Comment, req, res);
});

router.delete('/', (req, res) => {
  deleteRecord(Comment, req, res);
});

module.exports = router;