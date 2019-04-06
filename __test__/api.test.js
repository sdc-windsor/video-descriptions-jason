const server = require('../server/index.js');
const request = require('supertest')(server);
const { sequelize } = require('../db/pg-index.js');
const seed = require('../db/pg-seed.js');

beforeAll(() => {
  return seed();
});

afterAll(async () => {
  await server.close();
  await sequelize.close();
  console.log('Server closed!');
});

/* Integration tests for the Descriptions endpoint */
describe('The Descriptions API', () => {

  test('GET with page & pageSize params returns a 200 status code', async () => {
    const response = await request.get('/api/descriptions?page=5&pageSize=10');
    expect(response.status).toEqual(200);
  });

  test('GET with a pageSize param of 10 returns 10 results', async () => {
    const response = await request.get('/api/descriptions?page=5&pageSize=10');
    expect(response.body.length).toEqual(10);
    expect(typeof response.body[0].text).toEqual('string');
  });

  test('GET with page & pageSize params returns descriptions in the correct shape', async () => {
    const response = await request.get('/api/descriptions?page=5&pageSize=10');
    expect(typeof response.body[0].text).toEqual('string');
    expect(typeof response.body[0].likes).toEqual('number');
    expect(typeof response.body[0].videoId).toEqual('number');
    expect(typeof response.body[0].categories).toEqual('object');
  });

  test('GET with ID returns one description', async () => {
    const response = await request.get('/api/descriptions?id=1');
    expect(typeof response.body.text).toEqual('string');
    expect(typeof response.body.likes).toEqual('number');
    expect(typeof response.body.videoId).toEqual('number');
    expect(typeof response.body.categories).toEqual('object');
  });

  test('POST returns a status code of 201 and the description created', async () => {
    const data = {
      id: 101,
      videoId: 101,
      text: 'Sed pariatur officiis quia delectus rem exercitationem',
      likes: 555121,
      categories: ['Science', 'Food']
    }
    const response = await request.post('/api/descriptions').send(data)
    expect(response.status).toEqual(201);
    expect(response.body.likes).toEqual(555121);
  });

  test('PUT returns a status code of 200 and the number of records updated', async () => {
    const data = {
      text: 'Sed pariatur officiis quia delectus rem exercitationem',
    }
    const response = await request.put('/api/descriptions?id=101').send(data)
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(1);
  });

  test('DELETE returns a status code of 200 and the number of records deleted', async () => {
    const response = await request.delete('/api/descriptions?id=101')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

});

/* Integration tests for the Comments endpoint */
describe('The Comments API', () => {

  test('GET with page & pageSize params returns a 200 status code', async () => {
    const response = await request.get('/api/comments?page=5&pageSize=10');
    expect(response.status).toEqual(200);
  });

  test('GET with a pageSize param of 10 returns 10 results', async () => {
    const response = await request.get('/api/comments?page=5&pageSize=10');
    expect(response.body.length).toEqual(10);
    expect(typeof response.body[0].text).toEqual('string');
  });

  test('GET with page & pageSize params returns comments in the correct shape', async () => {
    const response = await request.get('/api/comments?page=5&pageSize=10');
    expect(typeof response.body[0].text).toEqual('string');
    expect(typeof response.body[0].userId).toEqual('number');
    expect(typeof response.body[0].videoId).toEqual('number');
  });

  test('GET with ID returns one comment', async () => {
    const response = await request.get('/api/comments?id=100');
    expect(typeof response.body.text).toEqual('string');
    expect(typeof response.body.userId).toEqual('number');
    expect(typeof response.body.videoId).toEqual('number');
  });

  test('POST returns a status code of 201 and the comment created', async () => {
    const data = {
      id: 1000,
      videoId: 100,
      userId: 10,
      text: 'Sed pariatur officiis quia delectus rem exercitationem'
    }
    const response = await request.post('/api/comments').send(data)
    expect(response.status).toEqual(201);
    expect(response.body.userId).toEqual(10);
  });

  test('PUT returns a status code of 200 and the number of records updated', async () => {
    const data = {
      text: 'Sed pariatur officiis quia delectus rem exercitationem',
    }
    const response = await request.put('/api/comments?id=100').send(data)
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(1);
  });

  test('DELETE returns a status code of 200 and the number of records deleted', async () => {
    const response = await request.delete('/api/comments?id=100')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

});

/* Integration tests for the Users endpoint */
describe('The Users API', () => {

  test('GET with page & pageSize params returns a 200 status code', async () => {
    const response = await request.get('/api/users?page=5&pageSize=10');
    expect(response.status).toEqual(200);
  });

  test('GET with a pageSize param of 10 returns 10 results', async () => {
    const response = await request.get('/api/users?page=5&pageSize=10');
    expect(response.body.length).toEqual(10);
    expect(typeof response.body[0].user_thumbnail).toEqual('string');
  });

  test('GET with page & pageSize params returns users in the correct shape', async () => {
    const response = await request.get('/api/users?page=5&pageSize=10');
    expect(typeof response.body[0].username).toEqual('string');
    expect(typeof response.body[0].user_thumbnail).toEqual('string');
  });

  test('GET with ID returns one user', async () => {
    const response = await request.get('/api/users?id=100');
    expect(typeof response.body.username).toEqual('string');
    expect(typeof response.body.user_thumbnail).toEqual('string');
  });

  test('POST returns a status code of 201 and the user created', async () => {
    const data = {
      id: 101,
      username: 'Omari35',
      userThumbnail: 'https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg'
    }
    const response = await request.post('/api/users').send(data)
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('Omari35');
  });

  test('PUT returns a status code of 200 and the number of records updated', async () => {
    const data = {
      username: 'Omari36',
    }
    const response = await request.put('/api/users?id=101').send(data)
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(1);
  });

  test('DELETE returns a status code of 200 and the number of records deleted', async () => {
    const response = await request.delete('/api/users?id=100')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

});