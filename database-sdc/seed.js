require('dotenv').config();

const { generateDescriptions, generateComments, generateUsers } = require('./fakes.js');
const { Description, Comment, User } = require('./index.js');

/* Seeds the desired quantity of descriptions in a desired batch size.
Suggested 100,000 records/batch */
const seedDescriptions = async (qty = 10000000, batchSize = 100000) => {
  await Description.sync({force: true});
  let batches = Math.floor(qty / batchSize) + 1;
  let startingVideoId = 1;
  while(batches > 0) {
    let descriptions = generateDescriptions(batchSize, startingVideoId);
    await Description.bulkCreate(descriptions);
    batches --;
    startingVideoId += batchSize;
  }
}

/* Seeds the desired quantity of users, not using batches.
There are probably fewer users than primary records, so defaults to 100k records */
const seedUsers = async (qty = 100000) => {
  await User.sync({force: true});
  const users = generateUsers(qty);
  return User.bulkCreate(users);
}

const seedComments = async (videoQty = 10000000, batchSize = 100000) => {
  await Comment.sync({force: true});
  let start = 1;
  let batches = Math.floor(videoQty / batchSize) + 1;
  while(batches > 0) {
    let comments = generateComments(start, batchSize);
    await Comment.bulkCreate(comments);
    batches --;
    start += batchSize;
  }
}

const seed = async (qty, batchSize) => {
  await seedDescriptions(qty, batchSize);
  await seedComments(qty, batchSize);
  await seedUsers();
}

seed(10000000, 100000);