/* Generic CRUD controllers for all models.
The applicable Sequelize model must be passed in
as the first argument. */

/* Reads all records, paginated. */
exports.readAll = (Model, req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.pageSize);
  const offset = (page - 1) * limit;

  return Model.findAll({ offset, limit })
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Reads one record by id. */
exports.readOne = (Model, req, res) => {
  const { id } = req.query;
  return Model.findOne({where: { id }})
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Creates one record and sends it
back to the client. */
exports.create = (Model, req, res) => {
  console.log(req.body);
  return Model.create(req.body)
  .then(newRecord => {
    console.log(newRecord);
    res.status(201);
    res.json(newRecord);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Updates one record by id and sends the
quantity updated back to the client. */
exports.update = (Model, req, res) => {
  const { id } = req.query;
  return Model.update(req.body, { where: { id } })
  .then(numUpdated => {
    res.json(numUpdated);
  })
  .catch(err => {
    res.json(err);
  });
}

/* Deletes one record by id. */
exports.deleteRecord = (Model, req, res) => {
  const { id } = req.query;
  return Model.destroy({ where: { id } })
  .then(numDeleted => {
    res.json(numDeleted);
  })
  .catch(err => {
    res.json(err);
  });
}