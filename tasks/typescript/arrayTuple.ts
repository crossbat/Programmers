let number: number[] = [1, 2, 3, 4, 5];

let fruits: string[] = ['apple', 'orange', 'banana'];

number.forEach((num) => {
  console.log(num);
});

fruits.forEach((fruit) => {
  console.log(fruit);
});

type strOrNum = string | number;

//(string | number) 도 가능
let mixedArr: strOrNum[] = [1, 'two', 3, 'four']
mixedArr.forEach((val: strOrNum) => {
  console.log(val);
});

// let readonlyarr : ReadonlyArray<number> = [1,2,3];
// readonlyarr.shift(3)

let greeting: [number, string, boolean] = [1, 'hello', true];
greeting.forEach((item) => {
  console.log(item);
});
