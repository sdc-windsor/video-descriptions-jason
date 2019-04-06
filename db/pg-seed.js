require('dotenv').config();
const { sequelize } = require('./pg-index.js')
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const { data, pg: { host, user, port, database, password } } = require('../config.js');
const dataDir = path.resolve(__dirname, data);
const hirestime = require('hirestime');
const prettyMs = require('pretty-ms');
const ProgressBar = require('progress');

/* Create a pool of connections for CSV streaming */
const pool = new Pool({
  host,
  user,
  port,
  database,
  password
});

const { Description, Comment, User } = require('./pg-index.js');

/* Streams the contents of a CSV file into the database */
const seedFromCSV = async (Model, table) => {

  const stats = fs.statSync(`${dataDir}/${table}.csv`)
  const fileSizeInBytes = stats.size

  const bar = new ProgressBar(`Seeding ${table} table: [:bar] :percent`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: fileSizeInBytes
  });

  const getElapsed = hirestime();

  await Model.sync({force: true});
  const client = await pool.connect();
  const writeStream = client.query(copyFrom(`COPY ${table} FROM STDIN CSV HEADER`));
  const readStream = fs.createReadStream(`${dataDir}/${table}.csv`);

  writeStream.on('data', (chunk) => {
    bar.tick(chunk.length);
  });

  writeStream.on('end', () => {
    const elapsed = prettyMs(getElapsed(hirestime.MS));
    console.log(`Finished seeding the ${table} table in ${elapsed}!`);
    client.release();
  });

  return readStream.pipe(writeStream);

}

/* Combines seeding functions into one */
module.exports = seed = async () => {
  await seedFromCSV(User, 'users');
  await seedFromCSV(Description, 'descriptions');
  await seedFromCSV(Comment, 'comments');
}

// seed();