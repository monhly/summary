// 使用http搭建服务器
let http = require('http')
let fs = require('fs')
let path = require('path')
const { fstat } = require('fs')
let serve = http.createServer()
serve.on('request', (req, res) => {
  // 解决乱码问题
  res.setHeader('content-type', 'text/html;charset=utf8')
  // 根据不同的请求路径进行数据的请求
  let new_path = path.join(__dirname, './1.txt')
  if (req.url === '/') {
    fs.readFile(new_path, 'utf8', (err, file) => {
      if (err) {
        // 读取失败
        res.end('读取错误')
      } else {
        res.end(file)
      }
    })
  } else {
    res.end('你好世界')
  }
})
serve.listen(8080, () => {
  console.log('服务器启动了')
})
