const fs = require("fs");

const [line1, line2] = `${fs.readFileSync("./src/3.txt")}`.split("\n");

const visited = {};
const coord = { x: 0, y: 0 };

for (const instr of line1.split(",")) {
  const dir = instr[0];
  const distance = Number(instr.substr(1));
  for (let i = 0; i < distance; i++) {
    coord["LR".includes(dir) ? "x" : "y"] += "LD".includes(dir) ? -1 : 1;
    visited[coord.x + "," + coord.y] = 1;
  }
}

coord.x = coord.y = 0;

const dup = [];
for (const instr of line2.split(",")) {
  const dir = instr[0];
  const distance = Number(instr.substr(1));
  for (let i = 0; i < distance; i++) {
    coord["LR".includes(dir) ? "x" : "y"] += "LD".includes(dir) ? -1 : 1;
    if (visited[coord.x + "," + coord.y]) dup.push([coord.x, coord.y]);
  }
}

console.log(
  dup.map(([x, y]) => Math.abs(x) + Math.abs(y)).sort((a, b) => a - b)[0]
);
