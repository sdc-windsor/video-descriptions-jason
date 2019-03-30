require('dotenv').config();
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')
const copyFrom = require('pg-copy-streams').from;
const srcDir = path.resolve(__dirname, '../data');
const pool = new Pool();
const hirestime = require('hirestime');
const prettyMs = require('pretty-ms');
var ProgressBar = require('progress');

const { Description, Comment, User } = require('./pg-index.js');

/* Streams the contents of a CSV file into the database */
const seedFromCSV = async (Model, table) => {

  const stats = fs.statSync(`${srcDir}/${table}.csv`)
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
  const readStream = fs.createReadStream(`${srcDir}/${table}.csv`);

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
const seed = async () => {
  // await seedFromCSV(User, 'users');
  await seedFromCSV(Description, 'descriptions');
  // await seedFromCSV(Comment, 'comments');
}

seed();