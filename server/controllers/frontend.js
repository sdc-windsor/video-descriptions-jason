const { client } = require('../redis.js');

/* These controllers produce data in
exactly the shape that the UI expects,
given the parameters it provides. */

const { Description, Comment, User } = require('../../db/pg-index.js');

/* Retrieves a description record by videoId. */
exports.getDescription = (req, res) => {
  const { video_id } = req.params;
  return Description.findOne({ where: { video_id }})
  .then(description => {
    res.json(description);
    client.set(req.originalUrl, JSON.stringify(description));
  })
  .catch(err => {
    res.status(500);
    res.json(err);
  });
}

/* Retrieves a user record by userId. */
exports.getUser = (req, res) => {
  const id = req.params.user_id;
  User.findOne({where: { id }})
  .then(user => {
    res.json(user);
    client.set(req.originalUrl, JSON.stringify(user));
  })
  .catch(err => {
    res.status(500);
    res.json(err);
  });
}

/* Retrieves a userId by username. */
exports.getUserId = (req, res) => {
  const { username } = req.params;
  User.findOne({where: { username }})
  .then(user => {
    res.json(user.id);
    client.set(req.originalUrl, JSON.stringify(user.id));
  })
  .catch(err => {
    res.status(500);
    res.json(err);
  });
}

/* Retrieves all comment records for a videoId. */
exports.getCommentsForVideo = (req, res) => {
  const { video_id } = req.params;
  Comment.findAll({where: { video_id }, order: [['date','DESC']]})
  .then(comments => {
    res.json(comments);
    client.set(req.originalUrl, JSON.stringify(comments));
  })
  .catch(err => {
    res.status(500);
    res.json(err);
  });
}

/* Retrieves a description record by videoId,
using findAll method (returns an array). This makes little sense,
but the frontend remains intact... */
exports.getAllDescriptions = (req, res) =>  {
  const { video_id } = req.params;
  return Description.findAll({ where: { video_id }})
  .then(description => {
    res.json(description);
    client.set(req.originalUrl, JSON.stringify(description));
  })
  .catch(err => {
    res.status(500);
    res.json(err);
  });
}