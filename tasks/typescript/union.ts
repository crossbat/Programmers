type strOrNum = number | string

let strNum: strOrNum = 100;
let item: number;

const convertToString = (val: strOrNum): string => {
  if (typeof val === 'string') {
    item = 0;
  } else {
    item = val
  }
  return String(val);
}

const convertToNumber = (val: strOrNum): number => {
  return Number(val);
}

console.log(convertToNumber(strNum));
console.log(convertToString(strNum));
