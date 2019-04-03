const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3003;
const { sequelize } = require('../db/pg-index.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Static asset middleware */
app.use(express.static('public'));
app.use('/:id', express.static('public'));

/* Routes expected by frontend */
app.use('/', require('./routes/frontend.js'));

/* CRUD routes for comments, descriptions and users */
app.use('/api/comments', require('./routes/comments.js'));
app.use('/api/descriptions', require('./routes/descriptions.js'));
app.use('/api/users', require('./routes/users.js'));

/* TODO: Refactor to use env variable */
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;