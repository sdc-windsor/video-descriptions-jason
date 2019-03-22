require('dotenv').config();

const generateDescriptions = require('./fakes.js');
const Description = require('./index.js');


/* Attempt to seed using Sequelize -- does not work in time for 10,000,000 records */
const seedDescriptions = async (qty, batches) => {
  await Description.sync({force: true});
  const batchQty = qty / batches;
  while(batches > 0) {
    let descriptions = generateDescriptions(batchQty);
    await Description.bulkCreate(descriptions);
    batches --;
  }
}


// const seedDescriptions = (qty, batches) => {
//   const descriptions = generateDescriptions(qty/batches);
//   return Description.sync({force: true})
//   .then(() => {
//     return Description.bulkCreate(descriptions)
//   })
//   .then(() => {
//     const descriptions = generateDescriptions(qty/batches);
//     return Description.bulkCreate(descriptions)
//   })
// }

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
seedDescriptions(10000000, 100);