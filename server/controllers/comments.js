const { Op } = require('sequelize');
const { Comment } =  require('../../db/pg-index.js');

/* Reads all comments, paginated. */
exports.readAllComments = (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = start + pageSize - 1;

  return Comment.findAll({where: {
    id: {
      [Op.between]: [start, end]
    }
  }})
  .then(comments => {
    res.json(comments);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Reads one comment by comment id. */
exports.readOneComment = (req, res) => {
  const { id } = req.query;
  return Comment.findOne({where: { id }})
  .then(comment => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Creates one comment and sends the new
comment back to the client. */
exports.createComment = (req, res) => {
  return Comment.create(req.body)
  .then(comment => {
    res.json(comment);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Updates one comment by id and sends the
quantity updated back to the client. */
exports.updateComment = (req, res) => {
  const { id } = req.query;
  return Comment.update(req.body, { where: { id } })
  .then(numUpdated => {
    res.json(numUpdated);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Deletes one comment by id. */
exports.deleteComment = (req, res) => {
  const { id } = req.query;
  console.log(id);
  return Comment.destroy({ where: { id } })
  .then(numDeleted => {
    res.json(numDeleted);
  })
  .catch(err => {
    res.json(err);
  });
}