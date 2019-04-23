const express = require('express');
const router = express.Router();
const { Description } = require ('../../db/pg-index.js');
const { readAll, readOne, create, update, deleteRecord } = require('../controllers/crud.js');
const redis = require('redis');
const client = redis.createClient();

/* CRUD routes for the descriptions endpoint */

router.get('/', (req, res) => {
  if (req.query.page && req.query.pageSize) {
    readAll(Description, req, res);
  } else if (req.query.id) {
    readOne(Description, req, res);
  } else {
    res.send('Sorry, those aren\'t the correct params for this route!');
  }
});

router.post('/', (req, res) => {
  create(Description, req, res);
});

router.put('/', (req, res) => {
  update(Description, req, res);
});

router.delete('/', (req, res) => {
  deleteRecord(Description, req, res);
});

module.exports = router;