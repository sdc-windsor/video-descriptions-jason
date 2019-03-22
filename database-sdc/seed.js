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

// seedDescriptions(1);
seedDescriptions(10000000, 100);