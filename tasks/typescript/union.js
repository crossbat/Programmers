var strNum = 100;
var item;
var convertToString = function (val) {
    if (typeof val === 'string') {
        item = 0;
    }
    else {
        item = val;
    }
    return String(val);
};
var convertToNumber = function (val) {
    return Number(val);
};
console.log(convertToNumber(strNum));
console.log(convertToString(strNum));
