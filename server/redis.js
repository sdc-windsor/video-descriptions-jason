const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected!');
});

client.on('error', function (err) {
  console.log('Error with Redis: ' + err);
});

const cache = (req, res, next) => {
  const url = req.originalUrl;
  client.get(url, function (err, data) {
    if (err) throw err;
    if (data) {
      console.log('Sending from cache!')
      data = JSON.parse(data);
      res.json(data);
    } else {
      next();
    }
  });
}

module.exports = { client, cache }