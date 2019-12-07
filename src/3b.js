const fs = require("fs");

const [line1, line2] = `${fs.readFileSync("./src/3.txt")}`.split("\n");

const visited = {};
const coord = { x: 0, y: 0 };
let steps = 0;

for (const instr of line1.split(",")) {
  const dir = instr[0];
  const distance = Number(instr.substr(1));
  for (let i = 0; i < distance; i++) {
    coord["LR".includes(dir) ? "x" : "y"] += "LD".includes(dir) ? -1 : 1;
    visited[coord.x + "," + coord.y] = ++steps;
  }
}

coord.x = coord.y = steps = 0;

const dup = [];
for (const instr of line2.split(",")) {
  const dir = instr[0];
  const distance = Number(instr.substr(1));
  for (let i = 0; i < distance; i++) {
    coord["LR".includes(dir) ? "x" : "y"] += "LD".includes(dir) ? -1 : 1;
    ++steps;
    if (visited[coord.x + "," + coord.y])
      dup.push(steps + visited[coord.x + "," + coord.y]);
  }
}

console.log(dup.sort((a, b) => a - b)[0]);
