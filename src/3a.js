const fs = require('fs');

const file = '' + fs.readFileSync('./src/3.txt');

const visited = {};
let x = 0;
let y = 0;

const setX = (From, To, y, v, q) => {
  for (let x = From; x <= To; x++) {
    if (!visited[x]) visited[x] = {};
    if (!visited[x][y]) visited[x][y] = [];
    visited[x][y].push(v);
  }
}
const setY = (From, To, x, v, q) => {
  for (let y = From; y <= To; y++) {
    if (!visited[x]) visited[x] = {};
    if (!visited[x][y]) visited[x][y] = [];
    visited[x][y].push(v);
  }
}

function oof(l, q) {
  for (const instr of l.split(',')) {
    const c = instr.substr(0, 1);
    const v = Number(instr.substr(1));
    switch (c) {
      case 'L': setX(x-v, x, y, v, q); x -= v; break;
      case 'R': setX(x, x+v, y, v, q); x += v; break;
      case 'D': setY(y-v, y, x, v, q); y -= v; break;
      case 'U': setY(y, y+v, x, v, q); y += v;  break;
    }
    // visited[x][y] = [i, ...visited[x][y]].filter((v, i, a) => a.indexOf(v) === i)
  }
}

const [l1, l2] = file.split('\n');
oof(l1, 1);
oof(l2, 2);


console.log('here', [x, y], Object.keys(visited).map(x => {
  const a = Object.keys(visited[x]).filter(y => visited[x][y].length > 1);
  if (a.length) return { [x]: a };
}).filter(x => x));
