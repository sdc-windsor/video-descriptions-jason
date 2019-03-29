const faker = require('faker');
const fs = require('fs');
const path = require('path');
const dataDir = path.resolve(__dirname, '../data')
const dateFns = require('date-fns');

const categories = [
  'Auto & Vehicles',
  'Beauty & Fashion',
  'Comedy', 'Education',
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
  let qty = Math.floor(Math.random() * 3 + 1);
  for (let i = 0; i < qty; i ++) {
    let index = Math.floor(Math.random() * categories.length);
    results.push(categories[index]);
  }
  return results;
}

/* Fakes for Comments table */
const fakeDate = () => {
  return dateFns.format(faker.date.past(), 'YYYY-MM-DD HH:MM:ssZZ');
}

// yyyy-mm-dd'T'HH:mm:ssZ

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
  for (let i = 0; i < qty; i ++) {
    let text = fakeParagraph();
    let categories = processArrayForCSV(fakeCategories());
    let likes = fakeLikes();
    fs.appendFileSync(file, `${i},${i},${text},${likes},${categories}\n`);
  }
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
}

const generateData = (videoQty, userQty) => {
  generateDescriptions(videoQty);
  generateUsers(userQty);
  generateComments(videoQty, userQty);
}

generateData(100, 10);