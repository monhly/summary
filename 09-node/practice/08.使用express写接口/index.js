const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
// 配置获取获取表单的中间件
app.use(express.urlencoded({ extended: false }))
// 结觉跨域问题
app.use(cors())
// 导入路由的模块
const router = require('./router')
app.use('/api', router)
app.listen(port, () => console.log(`Example app listening on port port!`))
