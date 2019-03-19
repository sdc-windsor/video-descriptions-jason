require('dotenv').config();

const generateDescriptions = require('./fakes.js');
const Description = require('./index.js');


/* Attempt to seed using Sequelize -- does not work in time for 10,000,000 records */
const seedDescriptions = (qty, batches) => {
  const descriptions = generateDescriptions(qty);
  let t0;
  return Description.sync({force: true})
  .then(() => {
    t0 = process.hrtime()
    return Description.bulkCreate(descriptions)
  })
  .then(() => {
    const t2 = process.hrtime(t0);
    console.log(`Added ${qty} records to the database in ${t2[0]}s ${t2[1]/1000000}ms!`);
  })
  .catch((err) => {
    console.log(err);
  });
}

/* Using node-postgres instead */
const { Client } = require('pg');
const client = new Client();

const convertArrayToSQL = (arr) => {
  return arr.reduce((accum, val, index) => {
    return accum += arr[index + 1] ? `"${val}",` : `"${val}"}'`;
  },`'{`);
}

const createDescriptionsQuery = (qty) => {
  let queryString = 'INSERT INTO descriptions (text, categories, likes) VALUES '
  const descriptions = generateDescriptions(qty);
  descriptions.forEach((description, index) => {
    let punc = descriptions[index + 1] ? ',' : ';';
    let { text, categories, likes } = description;
    categories = convertArrayToSQL(categories);
    queryString += `('${text}', ${categories}, ${likes})${punc}`;
  });
  return queryString;
}

const seedDescriptionsPG = async (qty) => {
  let queryString = createDescriptionsQuery(qty);
  await client.connect();
  await client.query(queryString);
  client.end();
}


// seedDescriptions(1);
seedDescriptionsPG(10000000);