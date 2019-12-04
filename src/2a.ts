import { readFileSync } from 'fs';

const d: number[] = `${readFileSync('./src/2.txt')}`.replace(/\n/g, '').split(',').map(Number);

const f: Record<number, (a: number, b: number) => number> = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
  99: (a, b): never => {
    console.log(d.join(','));
    process.exit(0);
  },
}

for (let i = 0; i < d.length; i += 4) {
  const a = d[d[i+1]];
  const b = d[d[i+2]];
  d[d[i+3]] = f[d[i]](a, b);
}
