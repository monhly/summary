const express = require('express')
const app = express()
// 引入第三方的中间件
const body = require('body-parser')
// app.use((req, res, next) => {
//   console.log(req.url)
//   next()
// })
// app.use((req, res, next) => {
//   console.log('请求2', req.url)
// })
// app.post('/', (res, req, next) => {
//   console.log('请求走到了这里')
//   throw Error('读取失败')
// })
// 配置json数据
//application/json
// app.use(express.json())
// 获取请求体的数据
//解析application/ x-www-form-urlencoded：
// app.use(body.urlencoded({ extended: false }))
app.post('/', (res, req) => {
  // console.log(res)
  let str = ''
  res.on('data', (chunk) => {
    console.log(chunk.toString())
    str += chunk
  })
  res.on('end', () => {
    console.log(str)
    const querystring = require('querystring')
    const paras = querystring.parse(str)
    console.log(paras)
  })
  //[Object: null prototype] { name: '张是' }
})
app.use((err, req, res, next) => {
  console.log('错误的信息', err)
  //此时获取的就是json的数据
  res.send(err.message)
})
app.listen(8080, () => {
  console.log('服务器启动了')
})
