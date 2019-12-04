import { readFileSync } from 'fs';

const D: number[] = `${readFileSync('./src/2.txt')}`.replace(/\n/g, '').split(',').map(Number);

function test(noun: number, verb: number) {
  const d = [...D]; // clone
  d[1] = noun;
  d[2] = verb;

  const f: Record<number, (a: number, b: number) => number> = {
    1: (a, b) => a + b,
    2: (a, b) => a * b,
  }

  for (let i = 0; i < d.length; i += 4) {
    if (d[i] === 99) return d[0];
    const a = d[d[i+1]];
    const b = d[d[i+2]];
    d[d[i+3]] = f[d[i]](a, b);
  }
}

function main() {
  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
      if (test(n, v) === 19690720) {
        console.log({ n, v }, 100 * n + v);
      }
    }
  }
}
main();
