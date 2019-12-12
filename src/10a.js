const { readFileSync } = require("fs");

const lines = `${readFileSync("./src/10.txt")}`.split("\n");

function* eachAsteroid() {
  for (const [y, line] of lines.entries())
    for (const [x, char] of line.split("").entries())
      if (char === "#") yield [x, y];
}

const { atan2, PI: π } = Math;
const θ = (x, y) => (atan2(y, x) * 180) / π;

const list = [];
for (const [Ax, Ay] of eachAsteroid()) {
  const asteroids = {};
  for (const [x, y] of eachAsteroid()) asteroids[θ(Ax - x, Ay - y)] = true;
  list.push([[Ax, Ay], Object.keys(asteroids).length]);
}

console.log(...list.sort((a, b) => b[1] - a[1])[0]);
