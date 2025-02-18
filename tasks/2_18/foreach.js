//forEach 사용법
const arr = [1, 2, 3, 4, 5]

arr.forEach(function (a, b, c) {
  console.log(`a:${a}, b : ${b}, c : ${c}`)
})

//map과 forEach 함께 사용하기

let map = new Map()
map.set(7, 'seven')
map.set(8, 'eight')
map.set(9, 'nine')

map.forEach(function (a, b, c) {
  console.log(`a:${a}, b : ${b}, c : ${c}`)
})
