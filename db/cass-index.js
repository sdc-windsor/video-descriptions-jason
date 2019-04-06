const cassandra = require('cassandra-driver');

const { cass: { contactPoint, localDataCenter, keyspace } } = require('../config.js');

module.exports = new cassandra.Client({
  contactPoints: [contactPoint],
  localDataCenter,
  keyspace
});