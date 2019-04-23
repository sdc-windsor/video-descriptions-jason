const d3 = require('d3-random');

for (let i = 0; i < 100; i ++) {
  let rand = Math.floor((d3.randomExponential(1/9000000)()));
  if (rand > 10000000) {
    rand = 9000000
  }
  console.log(rand);
}