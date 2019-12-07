import { readFileSync } from "fs";

const d: number[] = `${readFileSync("./src/5.txt")}`
  .split("\n")[0]
  .split(",")
  .map(Number);

/*********************/
/*********************/
const IS_PART_2 = true;
/*********************/
/*********************/

const input = IS_PART_2 ? 5 : 1;
let output: number;

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
      d[d[i + 1]] = input;
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
      console.log(output);
      process.exit(0);
    default:
      console.warn("wtf is up kyle", d[i]);
      process.exit(1);
  }
}
