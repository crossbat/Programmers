const arr = [1, 2, 3, 4, 5]

console.log(arr)

const foreacgArr = arr.forEach(function (a, b, c) {
  return a * 2
})

const mapArr = arr.map(function (a, b, c) {
  return a * 2
})

console.log(arr)

console.log(`foreach로 return하면 ${foreacgArr},\nmap으로 return하면 ${mapArr} `)
