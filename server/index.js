require('dotenv').config();
var compression = require('compression')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('../config.js');
const { sequelize } = require('../db/pg-index.js');
const { cache } = require('./redis.js');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Static asset middleware */
app.use(express.static('public', {
  maxAge: '1d'
}));

app.use('/:id', express.static('public', {
  maxAge: '1d'
}));

/* Caching */
app.use('/', cache);

/* Routes expected by frontend */
app.use('/', require('./routes/frontend.js'));

/* CRUD routes for comments, descriptions and users */
app.use('/api/comments', require('./routes/comments.js'));
app.use('/api/descriptions', require('./routes/descriptions.js'));
app.use('/api/users', require('./routes/users.js'));

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = server;