require('dotenv').config()
const faker = require('faker');
const fs = require('fs');
const path = require('path');
const dateFns = require('date-fns');

/* Imports the data directory and the description and user quantities,
based on the current environment. */
const { data, descriptions, users } = require('../config.js');
const dataDir = path.resolve(__dirname, data);

const categories = [
  'Auto & Vehicles',
  'Beauty & Fashion',
  'Comedy',
  'Education',
  'Entertainment',
  'Family Entertainment',
  'Film & Animation',
  'Food',
  'Gaming',
  'How-to & Style',
  'Music',
  'News & Politics',
  'Nonprofits & Activism',
  'People & Blogs',
  'Pets & Animals',
  'Science & Technology',
  'Sports',
  'Travel & Events'
];

/* Fakes for Descriptions table */
const fakeParagraph = () => {
  return faker.lorem.paragraph();
}

const fakeLikes = () => {
  return Math.floor(Math.random() * 1000000);
}

const processArrayForCSV = (arr) => {
  return arr.reduce((accum, val, index) => {
    return accum += arr[index + 1] ? `${val},` : `${val}}"`;
  },`"{`);
}

const fakeCategories = () => {
  const results = [];
  const categoriesCopy = categories.slice();
  let qty = Math.floor(Math.random() * 3 + 1);
  for (let i = 0; i < qty; i ++) {
    let index = Math.floor(Math.random() * categoriesCopy.length);
    // Splicing ensures that the same category isn't added more than once
    results.push(categoriesCopy.splice(index, 1)[0]);
  }
  return results;
}

/* Fakes for Comments table */
const fakeDate = () => {
  return dateFns.format(faker.date.past(), 'YYYY-MM-DD HH:MM:ssZZ');
}

/* Fakes for Users table */
const fakeAvatar = () => {
  return faker.internet.avatar();
}

const fakeUsername = () => {
  return faker.internet.userName();
}

/* CSV generators */
const generateDescriptions = (qty) => {
  const file = `${dataDir}/descriptions.csv`;
  fs.writeFileSync(file, 'id,videoId,text,likes,categories\n');
  for (let i = 1; i <= qty; i ++) {
    let text = fakeParagraph();
    let categories = processArrayForCSV(fakeCategories());
    let likes = fakeLikes();
    fs.appendFileSync(file, `${i},${i},${text},${likes},${categories}\n`);
  }
  console.log('All descriptions have been generated!');
}

const generateUsers = (qty) => {
  let users = fs.createWriteStream(`${dataDir}/users.csv`);
  users.write('id,username,user_thumbnail\n')
  for (let i = 1; i <= qty; i ++) {
    let username = fakeUsername();
    let userThumbnail = fakeAvatar();
    users.write(`${i},${username},${userThumbnail}\n`)
  }
  users.end();
  users.on('finish', () => {
    console.log('All users have been generated!');
  });
}

const generateComments = (videoQty, userQty) => {
  const file = `${dataDir}/comments.csv`
  fs.writeFileSync(file, 'id,videoId,text,date,userId\n')
  let commentId = 1;
  for (let videoId = 1; videoId <= videoQty; videoId ++) {
    let commentCount = Math.floor(Math.random() * 10);
    for (let i = 0; i < commentCount; i ++) {
      let userId = Math.floor(Math.random() * userQty) + 1;
      let text = fakeParagraph();
      let date = fakeDate();
      fs.appendFileSync(file, `${commentId},${videoId},${text},${date},${userId}\n`);
      commentId ++;
    }
  }
  console.log('All comments have been generated!');
}

/* By default, invoking generateData will create 10M primary records. */
const generateData = (descriptionQty = 10000000, userQty = 100000) => {
  generateDescriptions(descriptionQty);
  generateUsers(userQty);
  generateComments(descriptionQty, userQty);
}

/*
Data only needs to be generated once! And the files created are humongous!
Running the generateData function will overwrite the descriptions/comments/users
.csv files in the data directory (or the data-test directory if NODE_ENV=test)
*/

generateData(descriptions, users);