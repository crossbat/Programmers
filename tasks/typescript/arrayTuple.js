var number = [1, 2, 3, 4, 5];
var fruits = ['apple', 'orange', 'banana'];
number.forEach(function (num) {
    console.log(num);
});
fruits.forEach(function (fruit) {
    console.log(fruit);
});
//(string | number) 도 가능
var mixedArr = [1, 'two', 3, 'four'];
mixedArr.forEach(function (val) {
    console.log(val);
});
// let readonlyarr : ReadonlyArray<number> = [1,2,3];
// readonlyarr.shift(3)
var greeting = [1, 'hello', true];
greeting.forEach(function (item) {
    console.log(item);
});
