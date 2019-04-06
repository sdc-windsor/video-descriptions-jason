const server = require('../server/index.js');
const request = require('supertest')(server);

afterAll(() => {
  server.close();
  console.log('Server closed!');
});

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
    const response = await request.get('/api/descriptions?id=8000000');
    expect(typeof response.body.text).toEqual('string');
    expect(typeof response.body.likes).toEqual('number');
    expect(typeof response.body.videoId).toEqual('number');
    expect(typeof response.body.categories).toEqual('object');
  });

  test('POST returns a status code of 201 and the description created', async () => {
    const data = {
      videoId: 10000004,
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
    const response = await request.put('/api/descriptions?id=9500004').send(data)
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(1);
  });

  test('DELETE returns a status code of 200 and the number of records deleted', async () => {
    const response = await request.delete('/api/descriptions?id=9500004')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

});

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

  test('GET with ID returns one description', async () => {
    const response = await request.get('/api/comments?id=9000000');
    expect(typeof response.body.text).toEqual('string');
    expect(typeof response.body.userId).toEqual('number');
    expect(typeof response.body.videoId).toEqual('number');
  });

  test('POST returns a status code of 201 and the description created', async () => {
    const data = {
      videoId: 5000000,
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
    const response = await request.put('/api/comments?id=9500002').send(data)
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(1);
  });

  test('DELETE returns a status code of 200 and the number of records deleted', async () => {
    const response = await request.delete('/api/comments?id=9500002')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });

});

// Next, figure out how to use a test database, mothalicka