import { readFileSync } from "fs";

const opcodeInstr: number[] = `${readFileSync("./src/7.txt")}`
  .split("\n")[0]
  .split(",")
  .map(Number);

function OpComputer(d: number[], input1: number, input2: number): number {
  let output: number;

  let second = false;

  enum Opcode {
    addition = 1,
    multiplication,
    input,
    output,
    jumpIfTrue,
    jumpIfFalse,
    lessThan,
    equals
  }

  for (let i = 0; i < d.length; ) {
    // 1 = immediate, 0 = position
    const mode = (n: number): boolean =>
      !!(Math.floor(d[i] / 10 ** (n + 1)) % 10);

    const val1 = mode(1) ? d[i + 1] : d[d[i + 1]];
    const val2 = mode(2) ? d[i + 2] : d[d[i + 2]];
    const val3 = mode(3) ? d[i + 3] : d[d[i + 3]];

    const code: Opcode = d[i] % 100;

    switch (code) {
      case Opcode.addition:
        d[d[i + 3]] = val1 + val2;
        i += 4;
        break;
      case Opcode.multiplication:
        d[d[i + 3]] = val1 * val2;
        i += 4;
        break;
      case Opcode.input:
        d[d[i + 1]] = second ? input2 : input1;
        if (!second) second = true;
        i += 2;
        break;
      case Opcode.output:
        output = val1;
        i += 2;
        break;
      case Opcode.jumpIfTrue:
        if (val1) i = val2;
        else i += 3;
        break;
      case Opcode.jumpIfFalse:
        if (!val1) i = val2;
        else i += 3;
        break;
      case Opcode.lessThan:
        d[d[i + 3]] = +(val1 < val2);
        i += 4;
        break;
      case Opcode.equals:
        d[d[i + 3]] = +(val1 === val2);
        i += 4;
        break;
      case 99:
        return output;
      default:
        console.warn("wtf is up kyle", d[i]);
        process.exit(1);
    }
  }
}

function tryWithPhaseSetting(phaseSetting: number[]) {
  let tracking = 0;
  for (const sett of phaseSetting) {
    tracking = OpComputer([...opcodeInstr], sett, tracking);
  }
  return tracking;
}

let highest: [number, number[]] = [0, [0, 0, 0, 0, 0]];

const lo = 0 as const;
const hi = 5 as const;

for (let i = lo; i < hi; i++) {
  for (let j = lo; j < hi; j++) {
    for (let k = lo; k < hi; k++) {
      for (let l = lo; l < hi; l++) {
        for (let m = lo; m < hi; m++) {
          const phaseSetting = [i, j, k, l, m];
          if ([0, 1, 2, 3, 4].every(n => phaseSetting.includes(n))) {
            const d = tryWithPhaseSetting(phaseSetting);
            if (d > highest[0]) highest = [d, [i, j, k, l, m]];
          }
        }
      }
    }
  }
}
console.log(highest);
