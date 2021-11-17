const express = require('express')
const app = express()
const port = 3000
// 导入路由的模块
const router = require('./router')
// 给路由增加前缀
// 此时请求时就需要加上/api
app.use('/api', router) //进行注册
console.log(router)
app.listen(port, () => console.log(`Example app listening on port port!`))
