const express = require('express')
const app = express()
app.listen(3000)

const fruits = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'grape' },
  { id: 4, name: 'strawberry' }
]

app.get('/fruits', (req, res) => {
  res.json(fruits)
})

app.get('/fruits/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  //방법 1
  //let fruit = fruits[id - 1]

  //방법 2
  //fruits.forEach(function(fruit){
  //  if(fruit.id == id){
  //    findFruit = fruit
  //  }
  //})

  //방법 3
  var findFruit = fruits.find(f => f.id == id)
  if (findFruit) {
    res.json(findFruit)
  } else {
    res.status(404).send(
      '전달주신 id로 저장된 과일이 없습니다.'
    )
  }
})
