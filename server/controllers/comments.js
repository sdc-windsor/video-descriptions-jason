// COMMENTS ROUTES
  // app.get('/comments')
  // app.get('/comments/comment_id)
  // app.post('/comments')
  // app.put('/comments/comment_id')
  // app.delete('/comments/comment_id')

const Sequelize = require('sequelize');
const Op = Sequelize.Op
const { Comment } =  require('../../db/pg-index.js');

/* Read all comments, paginated. */
exports.readAllComments = (req, res) => {
  const { page, recordsPerPage } = req.query;
  const start = (page - 1) * recordsPerPage + 1;
  const end = start + recordsPerPage - 1;

  Comment.findAll({where: {
    [Op.between]: [start, end]
  }})
  .then((comments) => {
    res.json(comments);
  })
  .catch(err => {
    res.json(err);
  });
}

exports.readOneComment = (req, res) => {
  Comment.findOne({where: {
    id: req.id
  }})
  .then((comment) => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}

exports.createComment = (req, res) => {
  Comment.create(req.body)
  .then((comment) => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}

exports.updateComment = (req, res) => {
  const { id } = req.query;
  Comment.update(req.body, { where: { id } })
  .then((comment) => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}

exports.deleteComment = (req, res) => {
  const { id } = req.query;
  Comment.destroy(req.body, { where: { id } })
  .then((comment) => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}