const d3 = require('d3-random');

/* Generates a random video along an exponential (aka power) curve,
with a bias toward the most popular video. */
const generateRandomVideo = (mostPopVid = 9000000) => {
  let rand = Math.floor((d3.randomExponential(1/mostPopVid)()));
  return rand <= 10000000 ? rand : mostPopVid
}

exports.generateTestVars = (context, events, done) => {
  const id = generateRandomVideo();
  context.vars.id = id;
  return done();
}