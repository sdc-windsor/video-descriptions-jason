require('dotenv').config();
const fs = require('fs')
const path = require('path')
const { Pool, Client } = require('pg')
const copyFrom = require('pg-copy-streams').from;
const srcDir = path.resolve(__dirname, '../data');
const pool = new Pool();
const hirestime = require('hirestime');
const prettyMs = require('pretty-ms');

const { Description, Comment, User } = require('./index.js');

/* Streams contents of CSV file into database */
const seedFromCSV = async (Model, table) => {
  const getElapsed = hirestime();

  await Model.sync({force: true});
  const client = await pool.connect();
  const writeStream = client.query(copyFrom(`COPY ${table} FROM STDIN CSV HEADER`));
  const readStream = fs.createReadStream(`${srcDir}/${table}.csv`);

  writeStream.on('end', () => {
    const elapsed = prettyMs(getElapsed(hirestime.MS));
    console.log(`Finished seeding the ${table} table in ${elapsed}!`);
    client.release();
  });

  return readStream.pipe(writeStream);
}

const seed = async () => {
  await seedFromCSV(User, 'users');
  await seedFromCSV(Description, 'descriptions');
  await seedFromCSV(Comment, 'comments');
}

seed();