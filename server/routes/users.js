const express = require('express');
const router = express.Router();
const { User } = require ('../../db/pg-index.js');
const { readAll, readOne, create, update, deleteRecord } = require('../controllers/crud.js');

/* CRUD routes for the users endpoint */

router.get('/', (req, res) => {
  if (req.query.page && req.query.pageSize) {
    readAll(User, req, res);
  } else if (req.query.id) {
    readOne(User, req, res);
  } else {
    res.send('Sorry, those aren\'t the correct params for this route!');
  }
});

router.post('/', (req, res) => {
  create(User, req, res);
});

router.put('/', (req, res) => {
  update(User, req, res);
});

router.delete('/', (req, res) => {
  deleteRecord(User, req, res);
});

module.exports = router;