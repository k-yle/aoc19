import { readFileSync } from "fs";

/*************/
const PART = 2;
/*************/

export type Code = number[];

enum Opcode {
  addition = 1,
  multiplication,
  input,
  output,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  equals,
  shiftRelativeBase = 9
}

enum Mode {
  position,
  immediate,
  relative
}

export function OpComputer(
  d0: Code,
  input1: number,
  input2?: number
): number[] {
  let d = [...d0, ...new Array(10000).fill(0)];
  let output: number[] = [];

  let relativeBase = 0;

  let second = false;

  for (let i = 0; i < d.length; ) {
    const mode = (n: number): Mode => Math.floor(d[i] / 10 ** (n + 1)) % 10;

    const getVal = (n: number) => {
      if (mode(n) === Mode.relative) return relativeBase + d[i + n];
      else if (mode(n) === Mode.immediate) return i + n;
      else if (mode(n) === Mode.position) return d[i + n];
      else throw new Error("its broke");
    };

    const [p1, p2, p3] = [getVal(1), getVal(2), getVal(3)];

    const code: Opcode = d[i] % 100;

    switch (code) {
      case Opcode.addition:
        d[p3] = d[p1] + d[p2];
        i += 4;
        break;
      case Opcode.multiplication:
        d[p3] = d[p1] * d[p2];
        i += 4;
        break;
      case Opcode.input:
        if (second) input2 ?? console.warn("2+ inputs wanted but only 1 given");
        d[p1] = second ? input2 : input1;
        if (!second) second = true;
        i += 2;
        break;
      case Opcode.output:
        if (d[p1] || d[p1] === 0) {
          output.unshift(d[p1]);
          // console.log("Output yeet", output);
        }
        i += 2;
        break;
      case Opcode.jumpIfTrue:
        if (d[p1]) i = d[p2];
        else i += 3;
        break;
      case Opcode.jumpIfFalse:
        if (!d[p1]) i = d[p2];
        else i += 3;
        break;
      case Opcode.lessThan:
        d[p3] = +(d[p1] < d[p2]);
        i += 4;
        break;
      case Opcode.equals:
        d[p3] = +(d[p1] === d[p2]);
        i += 4;
        break;
      case Opcode.shiftRelativeBase:
        relativeBase += d[p1];
        i += 2;
        break;
      case 99:
        return output;
      default:
        console.warn("wtf is up kyle", d[i]);
        process.exit(1);
    }
  }
}

const opcodeInstr: Code = `${readFileSync("./src/9.txt")}`
  .split("\n")[0]
  .split(",")
  .map(Number);

console.log(OpComputer(opcodeInstr, PART)[0]);
