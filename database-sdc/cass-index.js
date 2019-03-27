const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'test' });

const query = 'SELECT * FROM users WHERE id = 1';

client.execute(query)
  .then(result => console.log(result.rows[0]))
  .catch(err => console.log(`${err.message} ${err.info}`));