const express = require('express')
const app = express()
app.listen(3000)

let users = new Map
var userCount = 1

app.post('/login', (req, res) => {
  let userId = req.body.id
  let userPassword = req.body.password
  if (userId) {
    if (userPassword) {
      res.status(200).json({
        message: `${req.body.id}님 환영합니다.`
      })
    } else {
      res.status(400).json({
        message: '비밀번호를 입력해주세요'
      })
    }
  } else {
    res.status(400).json({
      message: '아이디를 입력해주세요'
    })
  }
})

app.use(express.json())
app.post('/join', (req, res) => {
  let userName = req.body.name
  let userId = req.body.id
  let userPassword = req.body.password

  if (userName && userId && userPassword) {
    users.set(userCount++, {
      name: userName,
      id: userId,
      password: userPassword
    })
    res.status(201).json({
      message: `${userId}님 환영합니다!`
    })
  } else {
    res.status(400).json({
      message: '모든 항목을 다 채워주십시오.'
    })
  }
})

app.get('/users/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let user = users.get(id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({
      message: '등록되지 않은 사용자입니다.'
    })
  }
})

app.delete('/users/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let user = users.get(id)
  if (user) {
    res.status(200).json({
      message: `${user.id}님, 다음에 또 뵙겠습니다.`
    })
    users.delete(id)
  } else {
    res.status(404).json({
      message: '등록되지 않은 사용자입니다.'
    })
  }
})
