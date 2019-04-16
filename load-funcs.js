const generateRandomVideo = (min = 9000000, max = 10000000) => {
  return min + Math.floor(Math.random() * (max - min));
}

exports.generateTestVars = (context, events, done) => {
  const id = generateRandomVideo();
  context.vars.id = id;
  return done();
}