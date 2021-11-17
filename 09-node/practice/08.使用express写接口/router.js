const express = require('express')
const Router = express.Router()
Router.get('/get', (req, res) => {
  res.send({ status: 200, data: req.query })
})
// 获取post的请求
Router.post('/post', (req, res) => {
  console.log(req.body)
  res.send({
    status: 200,
    body: req.body,
  })
})
Router.delete('/delete', (req, res) => {
  console.log('我是deleet的数据')
})
module.exports = Router
