const express = require('express')
// 创建路由
const router = express.Router()
router.get('/', (req, res, next) => {
  // console.log(req.url)
  console.log('走到了这里')
  // res.send('nihao ya shijie')
})
router.get('/', (req, res) => {
  console.log(req.url)
  res.send('nihao ya shijie')
})
module.exports = router
