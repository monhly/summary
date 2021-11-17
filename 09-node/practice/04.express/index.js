// 使用express搭建服务器
const express = require('express')
const app = express()
// console.log(app)
const port = 3000
//监听get的请求

app.get('/', (req, res) => {
  // 获取get中query的参数
  console.log(req.query)
  // 没有参数则输出空对象
})
// 获取动态路由
app.get('/:id/:name', (req, res) => {
  console.log('我是req', req)
  console.log(req.params)
  // 此次获取的是动态参数
  // { id: '12132132' }
  //获取多个路由参数
  // { id: '12132132', name: 'sajhdkj' }
  res.send({ hello: 'word' })
})
// 监听post的请求
app.post('/', (req, res) => {
  console.log('群殴我呢')
})
app.listen(port, () => console.log(`Example app listening on port port!`))
