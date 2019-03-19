const faker = require('faker');

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

/* Descriptions table fakes */
const fakeParagraph = () => {
  return faker.lorem.paragraph();
}

const fakeLikes = () => {
  return Math.floor(Math.random() * 1000000);
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

const generateDescriptions = (qty) => {
  const t0 = process.hrtime();
  const results = []
  for (let i = 0; i < qty; i ++) {
    results.push(
      {
        text: fakeParagraph(),
        categories: fakeCategories(),
        likes: fakeLikes()
      }
    )
  }
  const t1 = process.hrtime(t0);
  console.log(`Generated ${qty} fake descriptions in ${t1[0]}s ${t1[1]/1000000}ms!`);
  return results;
}


/* Comments table fakes */
const fakeDate = () => {
  return faker.date.past();
}


/* User table fakes */
const fakeAvatar = (qty) => {
  return faker.internet.avatar();
}

module.exports = generateDescriptions;