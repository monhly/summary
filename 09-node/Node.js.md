# Node.js

# Node.js 介绍

## 什么是 Node.js

- Node.js 是一个 JavaScript 运行时环境，可以像浏览器一样解析和执行 JS 代码，让 JS 代码脱离浏览器运行
- Node.js 构建于 Chrome V8 引擎之上：Node.js 的作者把 Google Chrome 中的 V8 引擎移植了出来，开发了一个独立的 JS 运行时环境

## Node.js 的特性

- 事件驱动
- 非阻塞 I/O 模型（异步）
- 轻量和高效

## Node.js 学习目标

- B/S 编程模型
- 模块化编程
- Node 常用 API
- 异步编程
- Express 开发框架
- ECMAScript6

# Node 起步

## VSCode 设置

### 代码自动提示

1. 安装 typings ：`npm install typings --global`
2. 检查是否安装成功：`typings -v`
3. 切换到 Node 项目中：`cd C:\Users\lyy\Desktop\NodeJS`
4. 安装对应插件的提示工具：

5. 1. `typings install dt~node --global --save`
   2. `typings install dt~express --global`
   3. `typings install dt~lodash --global`

6. 启用提示功能：`/// `

## 简单上手 Node 程序

### node 之间参数的传递:

`node index.js env=development`

```js
//此时获取的参数是在process的内置对象中,在这个对象的argv的属性中里面包含了我们需要的参数
console.log(process.argv)
```

> argv argument vector 的缩写,传入的具体参数

```js
//在js中我们可以通过遍历进行数据的获取
```

### node 输出

cnosole.log 控制台的输出

conosle.clear 清空控制台

console.trace 打印函数的调用栈

### 常见的全局对象

1.process
2.dirname
3.filename
4.console
5,exports
6.global
7.module

### 解析执行 JavaScript

```
// test.js
console.log("Hello world!");
```

在 cmd 窗口对应文件夹下执行：

```
node test.js    // 结果：Hello world!
```

注意：文件名不能为`node.js`，最好也不要在文件名中出现中文

### 读写文件

\*\*
\*\*

读文件：

```
readFile('要读取的文件路径',function(error, data){});
```

写文件：

```
writeFile('要写入的文件路径','要写入的文件内容',function(error){});
```

```js
// 加载文件模块
var fs = require('fs')
// writeFile:写入文件
// 第一个参数是要写入的文件路径
// 第二个参数是要写入的文件内容
// 第三个参数是一个回调函数
fs.writeFile('./data/test.txt', '江苏海洋大学', function (error) {
  console.log('写入文件成功！')
})
// readFile：读取文件
// 第一个参数是要读取的文件路径
// 第二个参数是一个回调函数
fs.readFile('./data/test.txt', function (error, data) {
  if (error) {
    console.log('读取文件失败！')
  } else {
    console.log(data.toString())
  }
})
```

### 读取目录

`fs.readdir`

```js
//读取目录
fs.readdir('../readFile', (err, files) => {
  if (err) {
    console.log('读取文件失败')
  } else {
    console.log('读取的目录是', files)
  }
})
```

### readline 模块

该`readline`模块提供了一个接口，用于一次从一行的[Readable](https://nodejs.org/api/stream.html#stream_readable_streams) 流（例如[`process.stdin`](https://nodejs.org/api/process.html#process_process_stdin)）中读取数据。可以使用以下命令访问它：

```js
const readline = require('readline')
```

```js
//readline
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`)

  rl.close()
})
```

使用 node 在终端上的输入和输出

```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function getNews(title) {
  return new Promise((resolve, reject) => {
    rl.question(title, (answer) => {
      // TODO: Log the answer in a database
      resolve(answer)
    })
  })
}
async function getdat() {
  const data = await getNews('你好海事局诶你')
  console.log(data)
  const data1 = await getNews('啦啦')
  // 输入完毕,关闭页面
  rl.close()
}
getdat()
```

![](./assets/11.png)

### path 路径的模块

该`path`模块提供了用于处理文件和目录路径的实用程序。可以使用以下命令访问它：

```js
const path = require('path')
```

#### `path.extname(path)`[＃](https://nodejs.org/api/path.html#path_path_extname_path)

历史

- `path` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- 返回：[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

该`path.extname()`方法返回的扩展名`path`，从`.`（句号）字符的最后一次出现到的最后一部分中的字符串结尾`path`。如果`.`的最后部分没有`path`，或者`.`除`path`（参见`path.basename()`）的基本名称的第一个字符之外没有其他字符，则返回一个空字符串。

```js
const path = require('path')
console.log(path.extname('index.js'))
//此时输出的就是.js的后缀名
```

#### `path.join([...paths])`[＃](https://nodejs.org/api/path.html#path_path_join_paths)

在 v0.1.16 中添加

- `...paths` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)一系列路径段
- 返回：[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

该`path.join()`方法`path`使用特定于平台的分隔符作为分隔符将所有给定的段连接在一起，然后对结果路径进行规范化。

零长度`path`段将被忽略。如果连接的路径字符串是零长度的字符串，`'.'`则将返回该字符串，表示当前的工作目录。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar')
// Throws 'TypeError: Path must be a string. Received {}'
```

[`TypeError`](https://nodejs.org/api/errors.html#errors_class_typeerror)如果任何路径段都不是字符串，则抛出 A。

#### `path.parse(path)`[＃](https://nodejs.org/api/path.html#path_path_parse_path)

在 v0.11.15 中添加

- `path` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- 返回：[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

该`path.parse()`方法返回一个对象，其属性表示的重要元素`path`。尾部目录分隔符将被忽略，请参见[`path.sep`](https://nodejs.org/api/path.html#path_path_sep)。

返回的对象将具有以下属性：

- `dir` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- `root` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- `base` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- `name` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- `ext` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

```js
const path = require('path')
console.log(path.parse(__filename))

//此时输出的结果是:
/*
{
  root: 'F:\\',
  dir: 'F:\\学习和总结\\summary\\09-1使用node开发博客\\laochendama\\readFile',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
*/
```

### **补充**

使用 fs 写入文件的时候,一共有三个参数

![](./assets/10.png)

以下使用可以对读取的文件进行不覆盖的添加

```js
fs.writeFile(
  './index.txt',
  'hellow',
  { flag: 'a', encoding: 'utf8' },
  (error) => {
    if (error) {
      console.log('读取失败')
    } else {
      console.log('写入失败')
    }
  }
)
```

使用 promise 进行数据的封装

```js
//使用promise进行一步请求的返回
function writes(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, { flag: 'a', encoding: 'utf8' }, (error) => {
      if (error) {
        reject('服务失败')
      } else {
        resolve('读取成功')
      }
    })
  })
}
// 此时返回的shipromise
async function getdara() {
  await writes('./index.txt', '优秀的关系爱在')
  await writes('./index.txt', '优秀的关系爱在124125')
}
getdara()
```

注意：要对文件进行操作，需要先使用`require("fs")`加载文件模块

### url 模块

该`url`模块提供用于 URL 解析和解析的实用程序。可以使用以下命令访问它：

```js
const url = require('url')
```

该`url`模块提供了两个用于处理 URL 的 API：一个是特定于 Node.js 的旧 API，另一个是实现与 Web 浏览器使用的[WHATWG URL 标准](https://url.spec.whatwg.org/)相同的 API 。

下面提供了 WHATWG 和 Legacy API 之间的比较。在 URL 上方 `'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`，`url.parse()`显示了旧版返回的对象的属性。它的下面是 WHATWG `URL`对象的属性。

WHATWG URL 的`origin`属性包括`protocol`和`host`，但不 包括`username`或`password`。

```js
const url = require('url')
const myURL = url.parse(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
)
const myURL1 = new URL(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
)
console.log('myURL', myURL)
/**
 * myURL Url {
  protocol: 'https:',
  slashes: true,
  auth: 'user:pass',
  host: 'sub.example.com:8080',
  port: '8080',
  hostname: 'sub.example.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
}
 */
console.log('myURL1', myURL1)
/**
 * myURL1 URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
 */
```

### 简单的 HTTP 服务器

```js
/// <reference path="./typings/index.d.ts" />
// 1.加载http模块
var http = require('http')
// 2.创建一个Server实例
var server = http.createServer()
// 3.注册请求和响应事件
// request：获取客户端的一些请求信息，如请求路径等
// response：给客户端发送响应消息
server.on('request', function (request, response) {
  // 返回请求路径
  console.log('收到客户端的请求了，请求路径是：' + request.url)
  // 根据不同的请求路径返回不同的响应结果
  // write()方法可以向客户端发送响应消息
  // end()用来结束响应，否则客户端会一直等待
  // 也可以直接使用end()来发送消息，发送后关闭响应
  response.setHeader('Content-Type', 'text/plain;charset=utf-8') // 设置字符集编码
  if (request.url === '/') {
    response.end('首页')
  } else if (request.url === '/login') {
    response.end('登录页')
  } else if (request.url === '/register') {
    response.end('注册页')
  } else {
    response.end('未找到该页面')
  }
})
// 4.绑定端口号，启动服务器
server.listen(8888, function () {
  console.log('服务器启动成功，可以通过 http://127.0.0.1:8888/ 来访问！')
})
```

## Node 中的 JavaScript

**浏览器中的 JS 和 Node.js 中的 JS 区别**

- 浏览器中的 JS：

- - 由 ECMAScript、BOM 和 DOM 组成
  - 没有文件操作能力

- Node.js 中的 JS：

- - 仅由 ECMAScript 组成，没有 BOM 和 DOM
  - 可以操作文件

# node 事件

## event 事件

所述`EventEmitter`类的定义，并通过暴露的`events`模块：

```js
const EventEmitter = require('events')
```

当添加新的侦听器并删除现有的侦听器时，所有`EventEmitter`都会发出事件。` 'newListener'``'removeListener' `

```js
const EventEmitter = require('events')
const myEmitter = new EventEmitter()

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener')
})
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`)
})
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ')
  console.log(`event with parameters ${parameters} in third listener`)
})

console.log(myEmitter.listeners('event'))

myEmitter.emit('event', 1, 2, 3, 4, 5)
```

**使用 on,进行事件的注册**

### `emitter.emit(eventName[, ...args])`[＃](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args)

在 v0.1.26 中添加

- `eventName` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<符号>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)
- `...args` [<任何>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)
- 返回：[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

以注册事件`eventName`的顺序同步调用为名为的事件注册的每个侦听器，并将提供的参数传递给每个侦听器 。

返回`true`事件是否有侦听器，`false`否则返回。

### `emitter.on(eventName, listener)`[＃](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener)

在 v0.1.101 中添加

- `eventName` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)事件的名称。
- `listener` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)回调函数
- 返回：[](https://nodejs.org/api/events.html#events_class_eventemitter)

将`listener`函数添加到名为的事件的侦听器数组的末尾`eventName`。不检查是否`listener`已添加。多次调用传递的`eventName` 和的相同组合`listener`将导致`listener`多次被添加和调用。

```js
server.on('connection', (stream) => {
  console.log('someone connected!')
})
```

返回对的引用`EventEmitter`，以便可以链接调用。

默认情况下，事件侦听器按照添加顺序被调用。该 `emitter.prependListener()`方法可以用作将事件侦听器添加到侦听器数组的开头的替代方法。

```js
const myEE = new EventEmitter()
myEE.on('foo', () => console.log('a'))
myEE.prependListener('foo', () => console.log('b'))
myEE.emit('foo')
// Prints:
//   b
//   a
```

**使用 emit 进行事件的触发**

### `emitter.listeners(eventName)`[＃](https://nodejs.org/api/events.html#events_emitter_listeners_eventname)

历史

- `eventName` [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<符号>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Symbol_type)
- 返回：[](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

返回名为的事件的侦听器数组的副本`eventName`。

# 使用 node 进行爬虫

## axios 请求爬虫

`爬坑日记:`

在学习过程中还遇到的问题是对一些 https 的网站请求不到数据，报错是`Error: Client network socket disconnected before secure TLS connection was established`

使用 axios 进行数据的请求,使用正则进行匹配进行数据的筛选

## 使用 cheeryio 获取文档的内容

`为服务器特别定制的，快速、灵活、实施的jQuery核心实现.`

```js
//使用cheeryio可以对获取的文本进行dom的操作,类似于jquery一样
var cheerio = require('cheerio'),
  $ = cheerio.load('<ul id="fruits">...</ul>')
console.log($('ul').text())
//...
```

# 模块

## 什么是模块

在 Node 环境中，一个.js 文件就称之为一个模块（module），Node 中的模块有 3 种：

- 核心模块
- 用户自定义模块
- 第三方模块

## 使用模块的好处

\*\*
\*\*

- 大大提高了代码的可维护性
- 可以避免函数名和变量名冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突

## 核心模块

Node 为 JS 提供了很多服务器级别的 API，这些 API 绝大多数都被包装到一个具名的核心模块中

常用的核心模块有：

- 文件操作：fs
- HTTP 服务构建：http
- 路径操作：path
- 操作系统信息：os

要想使用核心模块，必须使用`require`先加载该模块

```
var os = require("os"); // 加载操作系统模块
console.log(os.cpus()); // 获取cpu信息
```

## 用户自定义模块

**什么是用户自定义模块**

由于在 Node 中，使用`node xx.js`执行 JS 文件时，一次只能执行一个 JS 文件，不能像浏览器中的 JS 那样通过`script`标签引入其他 JS 文件来同时执行，但是在 Node 中，可以通过`require('文件路径')`的方式来引入其他的 JS 文件，被引入的 JS 文件就叫做用户自定义模块

```
// test2.js
console.log("这是来自test2.js中的消息");

// test.js
require('./test2.js');
```

在终端中执行`node .\test.js`的结果为：这是来自 test2.js 中的消息

注意：

- 相对路径必须加`./`
- 在加载用户自定义模块时，可以省略文件后缀名，`require('./test2');`

**模块作用域**

\*\*
\*\*

由于在 Node 中，没有全局作用域，只有模块作用域，所以 JS 文件不能直接访问被引用模块内部的成员

```
// test2.js
var a = 1;

// test.js
require('./test2');
console.log(a);
```

以上代码执行的结果会报错：“ReferenceError: a is not defined”

但是有时候，加载模块不仅仅是为了执行其中的代码，还想要能够访问到被加载模块内部的成员，这时，可以使用`exports`

`exports`是每个文件模块中都会提供的一个对象，这个对象默认为空，当使用`require`加载模块的时候，其实这个对象也被加载过来了，只需要把需要访问的成员挂载到`exports`这个对象上，就可以访问了

```js
// test2.js
exports.a = 'hello' // 将a挂载到exports对象中

// test.js
var test2Export = require('./test2') // 获取exports对象
console.log(test2Export) // 打印exports对象
console.log(test2Export.a) // 打印exports对象中的成员a
```

以上代码执行结果为：

```js
{
  a: 'hello'
}
hello
```

## 其他模块

- \_\_dirname:表示当前文件的目录

- \_\_filename:表示的是当前文件的绝对路径

  两个目录都是动态的获取文件的路径

## 第三方模块

# Web 服务器开发

## IP 地址和端口号

**IP 地址**

用来定位计算机

**端口号**

用来定位具体的应用程序

- 一切需要联联网通信的软件都会占用一个端口号
- 端口号的范围：0~65535

关于分号的问题

3 种需要在开头加分号的情况：

- `（`
- `[`
- \```

```js
;(function () {})
;['apple', 'orange', 'banana'].each(function () {})
;`江苏海洋大学`.length
```

其余情况可以不用加分号

## 初步实现 Apache 功能

```js
// 初步实现Apache功能
// 1. 加载模块
var http = require('http') // 加载http模块
var fs = require('fs') // 加载文件操作模块
// 2.创建一个Server实例
var server = http.createServer()
var wwwDir = 'C:/Users/lyy/Desktop/NodeJS/www'
// 3.注册请求和响应事件
server.on('request', function (req, res) {
  var url = req.url // 获取请求路径
  var filePath = '/index.html' // 文件路径
  // 如果获取的 url 不是 '/'，则将改 url 赋值给文件路径
  if (url !== '/') {
    filePath = url
  }
  // 响应客户端请求
  //res.setHeader('Content-Type', 'text/plain;charset=utf-8'); // 设置字符集编码
  fs.readFile(wwwDir + filePath, function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    return res.end(data)
  })
})
// 4.绑定端口号，启动服务器
server.listen(8888, function () {
  console.log('Server is running, you can visitied by http://127.0.0.1:8888/ ')
})
```

## 服务端渲染与客户端渲染

服务端渲染就是在服务端使用模板引擎，模板引擎最早诞生于服务端，后来才发展到了前端

客户端渲染是异步的，很难被爬虫抓取到，所以不利于 SEO 搜索引擎优化

网站一般采用异步和服务器渲染结合的方式

# Node 中的模块系统

## CommonJS 模块规范

在 Node 中的 JavaScript 有一个很重要的概念：模块系统

- 模块作用域
- 使用 `require` 方法来加载模块
- 使用 `exports` 接口对象来到处模块中的成员

### 加载`require`

语法：

```
var 自定义变量名称 = require('模块')
```

两个作用：

- 执行被加载模块中的代码
- 得到被加载模块中的`exports`导出接口对象

### module 对象

> 在每个 .js 自定义模块中都有一个 module 对象，它表示当前这个具体的 .js 模块。module 对象上存储了和当前模块有关的信息。

打印每个模块的 module 之后,我们得到的信息是:

![](./assets/1.png)

### module.exports 对象

> 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
> 外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

使用 require() 方法导入模块时所得到的对象，永远以 module.exports 指向的对象为准

module.exports 导出的是一个对象,重新赋值以后,导出的就是一新的对象

```js
let a = '你好'
module.exports.a = a
console.log(module)
//此时module.exports导出的就是{a:'你好}
```

//此时 module.exports 等于新对象

```js
let a = '你好'
module.exports = {
  a: '我不在了',
  b: 'hello',
}
console.log(module)
/*此时获取的module.exports是
{ a: '我不在了', b: 'hello' },
*/
```

### 导出`exports`

- Node 中的模块作用域，默认文件中的所有成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，只需要把这些公开的成员都挂载到`exports`接口对象中就可以了

导出多个成员（必须在对象中）：

```js
exports.a = 123
exports.b = 'hello'
exports.c = function () {
  console.log('ccc')
}
exports.d = {
  foo: 'bar',
}
```

导出单个成员（拿到的就是函数、字符串）：

```
module.exports = 'hello'
```

以下情况会覆盖：

```
module.exports = 'hello'

module.exports = function(x,y){
  return x + y
}
```

也可以这样来导出多个成员：

```
module.exports = {
    add:function(){
     return x + y
  },
  str = 'hello'
}
```

### module.exports 和 exports 的区别是?

当出现 exports 和 module.exports 的时候,`永远以module.exports为准`

![](./assets/2.png)

## npm

### 什么是 npm

npm（node package manager）是 Node.js 的包管理工具

npm 可以根据依赖关系，把所有依赖的包都下载下来并管理起来

- 检查 npm 版本：`npm -v`
- 安装包：`npm install art-template` （install 可以简写为 i）
- 安装多个包（中间用空格隔开）：`npm i art-template jquery bootstrap`
- 初始化项目(会自动生成一个 package.json 文件)：`nmp init` （`npm init -y` 全部选项默认）

```
{
  "name": "npm-demo",
  "version": "0.0.1",
  "description": "这是一个测试项目",
  "main": "main.js",
  "dependencies": {
    "art-template": "^4.13.2"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "lyy",
  "license": "ISC"
}
```

- 将安装依赖写入 package.json 文件：`npm i --save jquery`

### devDependencies

如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。
与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。

### 解决 npm 被墙问题

由于 nmp 存储包文件的服务器在国外，所以下载包会很慢，这时可以使用[淘宝镜像](http://npm.taobao.org/)

**方法一**

1. 安装淘宝镜像的 `cnpm`

```
npm install --global cnpm
```

- 在任意目录执行都可以
- `--global` 表示安装到全局，而非当前目录

1. 使用 ` cnpm` 安装包

```
# 通过淘宝的服务器来下载 jQuery
cnpm install jquery
```

注意：安装 `cnpm` 之后，`npm` 还是可以继续使用

**方法二**

如果不想安装 `cnpm` ，但是又想使用淘宝镜像，可以通过以下方式：

```html
npm install jquery --registry=https://registry.npm.taobao.org
```

但是这样需要每次都手动添加 `--registry=https://registry.npm.taobao.org` 参数，可以将参数写到配置文件中：

```
npm config set registry https://registry.npm.taobao.org
```

查看 npm 配置信息：`npm config list`

注意：写入配置文件后，以后使用 `npm install` 都会通过淘宝镜像来下载

**方法三**

使用 nrm 来进行包的下载

为了更方便的切换下包的镜像源，我们可以安装 nrm 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下
包的镜像源。

![](./assets/3.png)

#### 包的分类

1. 项目包
   那些被安装到项目的 node_modules 目录中的包，都是项目包。
   项目包又分为两类，分别是：
   ⚫ 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到）
   ⚫ 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

![](./assets/4.png)

2. 全局包
   在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。
   全局包会被安装到 C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

![](./assets/5.png)

#### md 文档转 html

![](./assets/6.png)

#### package.json 和 package-lock.json 的区别

```txt
npm5的版本以后安装文件的时候都会自动生成成package-lock.json的这个文件
```

- 5 以后的版本不用加--save,会自动保存的依赖信息
-

#### 使用 npm 开发属于自己的包

在新的文件中必须包含以下的文件

在 itheima-utils 文件夹中，新建如下三个文件：
⚫ package.json （包管理配置文件）
⚫ index.js （包的入口文件）
⚫ README.md （包的说明文档）

发布包 2. 登录 npm 账号
npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。 3. 把包发布到 npm 上
将终端切换到包的根目录之后，运行 npm publish 命令，即可将包发布到 npm 上（注意：包名不能雷同）。 4. 删除已发布的包
运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包。

## 模块的加载机制

4.1 优先从缓存中加载
模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。
注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

4.2 内置模块的加载机制
内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。
例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。

4.3 自定义模块的加载机制
使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../
这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。
如果按确切的文件名没有找到模块，则 Node.js 会尝试带上 .js、 .json 或 .node 拓展名再加载。
⚫ .js 文件会被解析为 JavaScript 文本文件
⚫ .json 文件会被解析为 JSON 文本文件
⚫ .node 文件会被解析为通过 process.dlopen() 加载的编译后的插件模块

4.4 第三方模块的加载机制
如果传递给 require() 的模块标识符不是一个内置模块，也没有以 './' 或 '../' 开头，则 Node.js 会从当前模块的父目录开
始，尝试从它的 /node_modules 目录里加载模块。
如果没有找到，则移动到再上一层父目录，直到文件系统的根目录。
例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：
① C:\Users\itheima\project\node_modules\tools
② C:\Users\itheima\node_modules\tools
③ C:\Users\node_modules\tools
④ C:\node_modules\tools

4.5 目录作为模块
当把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：
① 在被加载的目录下创建一个 package.json 文件，并指定一个 main 属性，作为 require() 加载的入口
② 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
③ 如果这些尝试失败，则 Node.js 将会使用默认错误报告整个模块的缺失：Error: Cannot find module 'xxx'

## Express

### 什么是 Express

原生的 http 在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更高度统一

在 Node 中，有很多 Web 开发框架，express 是其中很重要的一个

[Express 官网](http://expressjs.com/)

### 安装 express

```
npm install --save express
```

简写：

```
npm i -S express

```

或者是

npm i express

### Hello World

```js
var express = require('express') // 加载 express
var app = express() // 创建服务器应用程序
app.use('/public/', express.static('./public/')) // 公开 public 目录
// 当服务器收到 / 请求时，执行的操作
app.get('/', function (req, res) {
  res.send('hello express!')
})
// 当服务器收到 /about 请求时，执行的操作
app.get('/about', function (req, res) {
  res.send('你好，我是 express!')
})
// 绑定端口号
app.listen(8888, function () {
  console.log('app is running...')
})
```

## Express 的基本操作

#### app.get 的使用

```js
app.get(//请求的路径,function(req,res){
  // 获取 URL 中携带的查询参数
    console.log(res.query)
    //query默认是一个空对象.在客户端的时候能够获取到get方式提交的参数?name='不知道'&age=22
    { name: "ksjdk'" }
    } )
//:参数名的形式可以匹配动态的参数值
app.get('/:id',(req,res)=>{
    console.log(req.params)
    //params里面存放的是动态匹配的参数值

})
//获取多个动态参数
app.get('/:id/:name', (req, res) => {
  console.log('我是req', req)
  console.log(req.params)
  //获取多个路由参数
  // { id: '12132132', name: 'sajhdkj' }
})
```

#### post 的使用

```js
app.post(url, function (req, res) {
  res.send('hello 世界')
})
```

#### 使用 app.send 进行数据的请求

```js
res.send({ hello: 'word' })
```

#### 托管静态的资源

![](./assets/7.png)

```js
const express = require('express')
const app = express()
// 依托静态资源
const assets = express.static('./public')
app.use(assets)
app.listen(3000, () => {
  console.log('服务器启动了')
})
//此时public文件夹就被暴露出去了,我们在浏览器中输入http://127.0.0.1:3000/js/index.js就能够访问到js的内容
```

`Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。 因此，存放静态文件的目录名不会出现在 URL 中`

在页面中托管多个静态页面的时候可以多次调用 app.use()方法

注意`访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。`

## express 路由

#### 概念:

> 广义上来讲，路由就是映射关系。

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

路由是由三部分组成的,分别是请求的类型,请求的 URL 地址,处理函数

```js
//如
app.get() / app.post()
```

#### 模块化路由的使用

① 创建路由模块对应的 .js 文件
② 调用 express.Router() 函数创建路由对象
③ 向路由对象上挂载具体的路由
④ 使用 module.exports 向外共享路由对象
⑤ 使用 app.use() 函数注册路由模块

```js
// 导入express文件
const express = require('express')
// 创建路由的对象
const router = express.Router()
router.get('/', (req, res) => {
  console.log(req.params)
  console.log(req.query)
})

// 挂载出去
module.exports = router
```

```js
//使用路由的板块
// 访问路由的文件
const router = require('./08.luyou的挂载')
// 注册路由
app.use(router)
//也可以为路由添加前后缀
app.use('/api', router)
```

### nodemon 自动重启服务器

使用第三方命令行工具 `nodemon` 可以帮我们解决频繁修改代码服务器重启问题

1. 安装 `nodemon` ：`npm install --global nodemon`
2. 使用 `nodemon` : `nodemon app.js`

使用 `nodemon` 启动的服务器程序，修改代码之后，通过 `Ctrl+S` 会自动重启服务器

[nodemon 无法使用的解决方案](https://blog.csdn.net/Yamx_/article/details/100900360)

### 在 Express 中配置使用 art-template 模板

[art-template express 官方文档](https://aui.github.io/art-template/express/)

1. 安装

```
npm install --save art-template express-art-template
```

1. 配置

```
// 配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'));
```

1. 使用

```js
// 处理 / 请求
app.get('/', function (req, res) {
  res.render('index.html', {
    title: 'hello world',
  })
})
```

如果希望修改默认的 views 试图渲染存储目录，可以使用：

```
app.set('views',目录路径)
```

### 在 Express 中获取表单 post 请求体数据

在 Express 中没有内置获取表单 post 请求的 API，需要使用一个第三方包：[body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)

注意：Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

```js
//在最新的express4.16.0的版本中express封装了相同的方法
app.use(express.urlencoded({extended:false))

```

1. 安装

```
npm install --save body-parser
```

1. 配置

```js
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
//extended: false：表示使用系统模块querystring来处理，也是官方推荐的
//extended: true：表示使用第三方模块qs来处理
```

1. 使用

```js
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## Express 中的中间件

> Express 中间件的调用流程
> 当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

### express 中间件的格式

`Express 的中间件，本质上就是一个 function 处理函数，Express 中间件的格式如下： 注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。`

中间件的类型

![](./assets/8.png)

#### 局部中间件

只在路由中生效的中间件

```js
const express = require('express')
const app = express()
app.get('/', (res, req, next) => {
  console.log('请求走到了这里')
})
app.get('/', (res, req) => {
  console.log(res)
})
app.listen(8080, () => {
  console.log('服务器启动了')
})
//此时当我们进行请求的时候,走到了中间件的位置,
```

`注意点:`

- 一定要把所有的中间件,放到所有路由的前面

#### 定义全局生效的中间件

```js
//全局的中间件必须要放在路由的前面.所以可以使用app.use来进行处理
const express = require('express')
const app = express()
app.use((req, res, next) => {
  console.log(req.url)
})
app.post('/', (res, req, next) => {
  console.log('请求走到了这里')
})
app.post('/', (res, req) => {
  console.log(res)
})
app.listen(8080, () => {
  console.log('服务器启动了')
})
//此处如果不增加next()则数据会一直停留在app.use哪里,不会往下进行请求
```

**了解中间件的使用注意事项
① 一定要在路由之前注册中间件
② 客户端发送过来的请求，可以连续调用多个中间件进行处理
③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数
④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
⑤ `连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象`**

```js
const express = require('express')
const app = express()
app.use((req, res, next) => {
  console.log(req.url) // 此时输出的路径是/
  next()
})
app.use((req, res, next) => {
  console.log('请求2', req.url) // 此时输出的路径也是/
})
```

## 中间件的分类

#### 应用级别的中间件

同上//局部生效的中间件和全局生效的中间件

```js
//通过 app.use() 或 app.METHOD() 函数，绑定到 app 实例上的中间件，叫做应用级别的中间件
//如:
const express = require('express')

const app = express()
app.use((req, res, next) => {
  console.log('我是中间接')
  next()
})
app.get('/', (req, res) => {
  console.log('服务器')
  res.send('你是get')
})
app.listen(5500, () => {
  console.log('服务器开始了')
})
```

#### 2.错误的中间件

```js
//错误级别的中间件 function 处理函数，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。
```

```js
const express = require('express')
const app = express()
// app.use((req, res, next) => {
//   console.log(req.url)
//   next()
// })
// app.use((req, res, next) => {
//   console.log('请求2', req.url)
// })
app.post('/', (res, req, next) => {
  console.log('请求走到了这里')
  throw new Error('读取失败')
})
app.post('/', (res, req) => {
  console.log(res)
})

app.use((err, req, res, next) => {
  console.log('错误的信息', err)
  res.send(err.message) //此时输出的就是'读取失败'
})
app.listen(8080, () => {
  console.log('服务器启动了')
})
```

`//错误中间件必须放在请求之后.因为错误是在请求之后获取到的`

#### .路由级别的中间件

绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不
过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上，代码示例如下：

`类似于应用级别的中间件`

![](./assets/9.png)

#### 3.express 内置的中间件

- 自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

  1. ① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

  2. ② express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

     ```js
     // 配置json数据
     //此时获取的就是json数据的
     app.use(express.json())
     // 获取请求体的数据
     app.post('/', (res, req) => {
       console.log(res.body)
     })
     app.use((err, req, res, next) => {
       console.log('错误的信息', err)
       //此时获取的就是json的数据
       res.send(err.message)
     })
     app.listen(8080, () => {
       console.log('服务器启动了')
     })
     ```

  3. ③ express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
//使用express.urlencoded能够解析pos条数据的格式
//ru
//使用postman发送post的请求
app.use(express.urlencoded({ extended: false }))
app.post('/', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})
```

`Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。`

#### app.use 的使用

```js
//注册路由
app.use('/',router)
//注册中间件
app.use(express.static()//)托管静态资源
app.use(express.json())//挂载内置中间件
app.use(express.urlencoded({extended:false}))//获取post请求中 body数据
app.use((req,res,next)=>{})//全局中间件处理
app.use((err,req,res,next)=>{})//错误中间件处理

```

#### 4.第三方的中间件

- 非 Express 官方内置的中间件，而是由第三方开发出来的 Express 中间件，叫做第三方中间件。在项目中，大家可以
  按需下载并配置第三方中间件，从而提高项目的开发效率。
  例如：除了使用 express.urlencoded 这个内置中间件来解析请求体数据，还可以使用 body-parser 这个第三方中间
  件，来解析请求体数据。使用步骤如下：
  1. ① 运行 npm install body-parser 安装中间件
  2. ② 使用 require 导入中间件
  3. ③ 调用 app.use() 注册并使用中间件

#### 5.自定义中间件

```js
const qs = require('querystring')
// 使用中间件app.use 来自定义一个全局生效的中间件
app.use((req, res, next) => {
  // 定义变量,用来存储客户端发送的请求数据
  let str = ''
  //监听req对象的data 事件(客户端发送的请求体数据)
  req.on('data', (chunk) => {
    str += chunk
  })
  // 监听end事件
  res.end('end', () => {
    console.log(str)
    //此时的str是url格式的编码,需要进行转换
    const body = qs.parse(str)
    // 使用qs自带的方法,转化成对象
    //最后将body挂载出去
    req.body = body
    next()
  })
})
```

## Express 写接口

路由的板块

```js
// 引入express
const express = require('express')
// 创建路由的实例对象
const router = express.Router()
router.get('/get', (req, res) => {
  var query = req.query
  res.send({
    message: 0,
    data: query,
  })
})
router.post('/post', (req, res) => {
  const body = req.body
  res.send({
    message: 0,
    data: body,
  })
})
// 将路由挂载到module上面
module.exports = router
```

使用接口的文档

```js
const express = require('express')
const app = express()
const router = require('./07.express.luyou')
// 引入中间件cors
const cors = require('cors')
app.use(express.urlencoded({ extended: false }))
//extended: false：表示使用系统模块querystring来处理，也是官方推荐的
//extended: true：表示使用第三方模块qs来处理
// 使用json的方式发送数据
app.use(express.json())
// 配置中间件
app.use(cors())

app.use('/api', router)
app.listen(5500, () => {
  console.log('server is running')
})
```

## express 中解决跨域的问题

1.cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。
使用步骤分为如下 3 步：
① 运行 npm install cors 安装中间件

```html
npm i cors//安装第三方的插件
```

② 使用 const cors = require('cors') 导入中间件

```js
const cors = require('cors')
```

③ 在路由之前调用 app.use(cors()) 配置中间件

```js
app.use(cors())
```

2.使用 jsonp 进行跨域

使用 jsonp 写接口的步骤:

① 获取客户端发送过来的回调函数的名字
② 得到要通过 JSONP 形式发送给客户端的数据
③ 根据前两步得到的数据，拼接出一个函数调用的字符串
④ 把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行

```js
//定义一个jsonp的请求
app.get('/json', (req, res) => {
  const fun = req.query.callback
  //获取客户端返回的回调函数
  const data = { name: '我是会', age: 20 }
  const str = `${fun}(${JSON.stringify(data)})`
  //将数据进行拼接,调用回调函数,在外面进行调用,从而获得数据
  // 此处需要拼接字符串,使用json进行转换,否则得到的数据是错误数据
  res.send(str)
})
```

## cors 的跨域资源共享

> CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。
> 同源安全策略默认阻止“跨域”获取资源。但是 CORS 给了 web 服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源

` CORS 的注意事项 ① CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了CORS 的接口。 ② CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服 务端接口（例如：IE10+、Chrome4+、FireFox3.5+）`

### CORS 响应头部 - Access-Control-Allow-Origin

如果指定了 Access-Control-Allow-Origin 字段的值为通配符 \*，表示允许来自任何域的请求，

### CORS 响应头部 - Access-Control-Allow-Headers

默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：
Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、
Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外
的请求头进行声明，否则这次请求会失败！

### CORS 响应头部 - Access-Control-Allow-Methods

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods
来指明实际请求所允许使用的 HTTP 方法。

```js
res.setHeader(' Access-Control-Allow-Methods','delete,post'
```

## 简单请求

同时满足以下两大条件的请求，就属于简单请求：
① 请求方式：GET、POST、HEAD 三者之一
② HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、
Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-form-
urlencoded、multipart/form-data、text/plain）

简单请求的特点：客户端与服务器之间只会发生一次请求。(火狐浏览器可见效果)

## 预检请求

> 只要符合以下任何一个条件的请求，都需要进行预检请求：
> ① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
> ② 请求头中包含自定义头部字段
> ③ 向服务器发送了 application/json 格式的数据

```js
/*在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一
次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。*/
;`预检请求的特点：OPTION 预检请求成功之后，才会发起真正的请求。`
```

## 回调函数

- 获取异步的数据,需要使用回调函数

- 异步的操作,如定时器,readfile writefile ajax 必须通过回调函数使用

- 解决异步函数

- ```js
  function add(x, y, callback) {
    console.log(1)
    setTimeout(function () {
      var ret = x + y
      callback(ret)
    })
  }
  add(10, 20, function (ret) {
    console.log(ret)
  })
  //传入一个函数,等到异步函数执行完以后再去执行,
  //使用回调函数可以获取到异步函数中的值,此时我们获取到的ret可以进行随意的使用
  ```

# 数据库和身份认证

## 配置 mysql 的环境

1. ### 数据库的概念:

   1. 用来组织,存储和管理数据的仓库

   ![image-20200307233329657](C:\Users\monster\AppData\Roaming\Typora\typora-user-images\image-20200307233329657.png)

   数据库的概念

   ![image-20200307233821233](C:\Users\monster\AppData\Roaming\Typora\typora-user-images\image-20200307233821233.png)

2. 常见的数据库以及分类

   MySQL 数据库,community 社区版本的免费版

   Oracle 数据库

   MongoDB 数据库

   其中 mysql 是传统的数据库,

   mongodb 是新型的数据库,在一定程度上弥补了传统型的数据库

3. 传统型数据库的数据组织结构

   传统的数据库中,数据的组织结构分为 数据库,数据表 数据行 字段 四个部分组成

4. MySQL server 提供专门的数据存储和服务的软件

   mysql bench MySQL 的可视化的工具

## MySQL 的基本使用

DataType 数据类型：
① int 整数
② varchar(len) 字符串
③ tinyint(1) 布尔值
字段的特殊标识：
① PK（Primary Key）主键、唯一标识
② NN（Not Null）值不允许为空
③ UQ（Unique）值唯一
④ AI（Auto Increment）值自动增长

1. 什么是 SQL
   SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。
   三个关键点：

① SQL 是一门数据库编程语言
② 使用 SQL 语言编写出来的代码，叫做 SQL 语句
③ SQL 语言只能在关系型数据库（例如 MySQL、Oracle、SQL Server）中使用。非关系型数据库（例如 Mongodb）
不支持 SQL 语言

重点掌握 查询数据（select） 、插入数据（insert into） 、更新数据（update） 、删除数据（delete）

查询数据

```my
-- SELECT * FROM user.shuju; --
```

查找单独的文件

```my
select username form user.shuju
```

插入数据

```my
insert into user.shuju (username,password) valus ('你是会','50')
向use.shuju的数据库中插入数据
```

更新数据

```my
update 表的名称 set 列的名称 =新的值  where 列的名称=某值

如把 users 表中 id 为 7 的用户密码，更新为 888888
update users set password=888888 where id=7
```

删除数据

```my
delete from user.shuju where id=7
删除shuju中id=7的数据
```

额外需要掌握的 4 种 SQL 语法：
where 条件、and 和 or 运算符、order by 排序、count(\*) 函数

where 条件的使用

```my
WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

如:SELECT * FROM user.shuju where id>10

除此之外还能够使用and和or
AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来
如:SELECT * FROM user.shuju where id>10 and username='你笑起来真好看'
```

order by 的使用

ORDER BY 语句用于根据指定的列对结果集进行排序。
ORDER BY 语句默认按照升序对记录进行排序。
如果您希望按照降序对记录进行排序，可以使用 DESC 关键字

```my
按照username进行升序排列 也可以使用关键字 ASC
SELECT * FROM user.shuju order by username
按照username进行降序排列
SELECT * FROM user.shuju order by username desc
多重的排序
对 user.shuju 表中的数据，先按照 username 字段进行降序排序，再按照 id 的字母顺序，进行升序排序
SELECT * FROM user.shuju order by username desc ,id ASC
```

count(\*)

COUNT(\*) 函数返回表中的记录数

如:查询 username='你好'的记录数,

```my
select count(*) from user.shuju where username='你好'
```

## 在 Express 中操作 mysql

在 express 中使用 mysql 需要先引入 mysql

在 Express 中操作数据库的步骤
① 安装操作 MySQL 数据库的第三方模块（mysql）
② 通过 mysql 模块连接到 MySQL 数据库
③ 通过 mysql 模块执行 SQL 语句

```txt
npm i mysql
```

```js
//导入第三方的express
const express = require('express')


const app = express()
// 导入mysql数据库
const mysql = require('mysql');
// 建立和数据的联系
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'user'
})
// // 检测是否连接成功
db.query('select 1', (err, data) => {
    if (err) return console.log(err.message);
    console.log(data);
})
// 获取用户的请求
app.get('/get', (req, res) => {
    // 请求数据库
    // console.log(req.statusCode);
    // console.log(req.statusMessage);
    // 声明sql的请求语句
    const mysqlstr = 'select * from user.shuju where status!=1'
    // 判断请求数据是否成功
    db.query(mysqlstr, (err, results) => {
        if (err) return res.send({ message: 0, data: err.message })
        res.send({ message: 200, data: results })
    })
})
//通过id获取用户的信息
app.get('/get/:id', (req, res) => {
    // 获取动态的id
    const params = req.params;
    // 此处使用?进行占位
    const mysql = 'select * from user.shuju where id=?'
    db.query(mysql, params.id, (err, results) => {
        if (err) return res.send({ message: 0, data: err.message });
        // 此处还需要进行判断是都有数据
        // 判断数据是否为空
        if (results.length === 0) {
            return res.send({ message: '数据请求失败' })
        }
        // 此时获取的data是一个数组加对象的格式,我们只需要获取对象就可以了
        res.send({ message: 0, data: results[0] })
    })
})
// 引入express.urlencoded
app.use(express.urlencoded({ extended: false }))
// 插入数据的使用
app.post('/insert', (req, res) => {
    const body = req.body
    console.log(body);
    // 判断用户是否插入失败,判断输入的密码和用户名不能是空值
    if (!body.username || body.username.length < 6) {
        return res.send({ status: 1, message: '用户名不能为空' })
    }
    if (!body.password || body.password.length < 6) {
        return res.send({ status: 1, message: '密码不能小于六位数' })
    }
    // 定义一个sql的语言
    const sql = 'insert into user.shuju  (username,password) values (?,?)'
    //便捷使用的
    const sql='insert into user.shuju set?'
    // 导入到数据库里面
    db.query(sql, [body.username, body.password], (err, results) => {
    //快捷的使用方法
        db.query(sql,body,(err,results)=>{
        if (err) return console.log(err.message);


        if (results.affectedRows !== 1) res.send({ message: 1, data: '插入失败' });
        if (results.affectedRows === 1) res.send({ message: '成功', data: results });

    })
})


// 更改数据前引入express第三方件body-parse
// 发送更改数据
app.use(express.urlencoded({ extended: false }))
app.post('/post', (req, res) => {
    // 获取post发送的数据
    const body = req.body
    console.log(body);
    // 定义更新数据库的变量
    const sql = 'update user.shuju set username=?,password=? where id=? '
    // 请求数据库
    db.query(sql, [body.username, body.password, body.id], (err, results) => {
        if (err) { return res.send({ message: '错误', data: err.message }) }
        //根据affectedRows来进行判断数据的更新情况
        if (results.affectedRows === 1) { res.send({ message: '成功', data: results }) }
    })

})

// 使用删除数据
app.get('/delete/:id', (req, res) => {
    const params = req.params
    //获取的是{id:5}
    const sql = 'delete from user.shuju where id=?'
    // 使用sql的语句
    db.query(sql, params.id, (err, results) => {
        // 判断状态
        if (err) return res.send({ status: 1, message: '删除失败' })
        if (results.affectedRows === 1) return res.send({ status: 0, message: '删除成功' })
    })

})
app.listen(8000, () => {
    console.log('server is running');

})
```

使用 mysql 的几点总结:

1. ```js
   db.query(mysqlstr, (err, results) => {
     if (err) return res.send({ message: 0, data: err.message })
     res.send({ message: 200, data: results })
   })
   //在查询数据的时候,results返回的是一个数组,里面有多条对象组成.根据id查询数据的时候,返回的是单条数据,所以此时我们可以直接选取数组results[0],来得到数据,同时根据results的长度来判断是否有数据
   //删除,添加更新数据的响应,是根据results.affectedRows来进行判断的,此时results返回的是一个对象
   ```

2. 查询数据:select \* from user.shuju where id=?

   添加数据:insert into user.shuju (username,password) values (?,?)

   便捷方式:insert into user.shuju set?

   更新数据:update user.shuju set username=?,password =? where id=?,

   便捷方法:update user.shuju set ? where id=?

   删除方法:delete from user.shuju where id=?

   除了增加方法不需要 Id 以外,其他的都需要根据 id 来使用,动态获取 id,使用 req.params 来获取.此时获取的 params 是一个对象{id:5}

3. 在插入数据的时候,需要手动判断输入的数据,内容不能为空值,即 body 的属性不能为 undefined

   一般添加数据都需要使用 post 请求,所以获取 post 数据的时候,需要使用 express 的中间件,

   即:app.use(express.urlencoded({extended:false}))

   ```js
   // 判断用户是否插入失败,判断输入的密码和用户名不能是空值
   if (!body.username || body.username.length < 6) {
     return res.send({ status: 1, message: '用户名不能为空' })
   }
   if (!body.password || body.password.length < 6) {
     return res.send({ status: 1, message: '密码不能小于六位数' })
   }
   ```

## 在 Node 中操作 MySQL

- 安装

```
npm install mysql
```

- 操作

```js
var mysql = require('mysql')

// 1 创建连接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
})

// 2 连接数据库
connection.connect()

// 3 执行数据操作
// 插入数据
connection.query(
  `insert into users values(null,"sss","123321")`,
  function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
  }
)
// 修改数据
connection.query(
  'update users set pwd = "000" where id = 2',
  function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
  }
)
// 删除数据
connection.query(
  'delete from users where id = 3',
  function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
  }
)
// 查询数据
connection.query('select * from users', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results)
})

// 4 关闭数据库连接
connection.end()
```

# web 开发模式及身份认证

## web 开发

目前主流的 Web 开发模式有两种，分别是：
① 基于服务端渲染的传统 Web 开发模式

服务端渲染的概念：服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不
需要使用 Ajax 这样的技术额外请求页面的数据

优点：
① 前端耗时少。因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
② 有利于 SEO。因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于 SEO。
缺点：
① 占用服务器端资源。即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
② 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于
项目高效开发。

② 基于前后端分离的新型 Web 开发模式

**前后端分离的概念：前后端分离的开发模式，依赖于 Ajax 技术的广泛应用。即后端不提供完整的 HTML 页面内容，而**
**是提供一些 API 接口，使得前端可以获取到 json 数据；然后前端通过 Ajax 调用后端提供的 API 接口，拿到 json 数据**
**之后再在前端进行 HTML 页面的拼接，最终展示在浏览器上。**
**简而言之，前后端分离的 Web 开发模式，就是后端只负责提供 API 接口，前端使用 Ajax 调用接口的开发模式。**

## 身份认证(authentication)

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：
① 服务端渲染推荐使用 Session 认证机制
② 前后端分离推荐使用 JWT 认证机制

### session 的认证机制

由于每次的 http 请求都是无状态的,所以需要保留每次的请求状态,就需要设置 Cookie 来保留状态

**Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用**
于控制 Cookie 有效期、安全性、使用范围的可选属性组成。
不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。
Cookie 的几大特性：
① 自动发送
② 域名独立
③ 过期时限
④ 4KB 限制

Cookie 在身份认证中的作用
客户端第一次请求服务器的时候，服务器通过**响应头**的形式，向客户端发送一个身份认证的 Cookie，客户端会自动
将 Cookie 保存在浏览器中。
随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过 **请求头** 的形式发送给
服务器，服务器即可验明客户端的身份。

cookie 不具有安全性

由于 Cookie 是存储在浏览器中的，而且**浏览器也提供了读写 Cookie 的 API**，因此 **Cookie 很容易被伪造**，不具有安全
性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

**session**

![image-20200311155451419](C:\Users\monster\AppData\Roaming\Typora\typora-user-images\image-20200311155451419.png)

**session 的局限性**

Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及前端跨域请求后端接口
的时候，需要做很多额外的配置，才能实现跨域 Session 认证。
注意：
⚫ **当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。**
⚫ **当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。**

### jwt 认证机制

JWT 通常由三部分组成，分别是 **Header（头部）、Payload（有效荷载）、Signature（签名）。**
三者之间使用英文的“.”分隔

其中：
**⚫ Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。**
**⚫ Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性**。

客户端收到服务器返回的 JWT 之后，通常会将它储存在 **localStorage 或 sessionStorage** 中。
此后，客户端每次与服务器通信，都要带上这个 JWT。**推荐的做法是把 JWT 放在 HTTP 请求头的 Authorization 字段**
**中**，Authentication:Bearer<token>

# 补充 app.use 的使用

## 注册路由的模块

app.use('/api',router)

## 注册中间件

app.use(express.static)

app.use(express.urlencoded({extended:false}))

# 使用 Express/MySQL 写 API 接口

## 初始化项目

```js
npm init -y
//生成package.json文件
```

```js
app.js文件
//导入express文件
const express = require('express')
//导入express路由的部分
const router = require('../router')
// 导入 Joi 来定义验证规则
const Joi = require('@hapi/joi')

//使用urlencoded
app.use(express.urlencoded({ extended: false }))

//注册路由
app.use('/api', router)

// 导入错误级别中间件
app.use(function (err, req, res, next) {
  // Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message,
    })
  }
  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message,
  })
})

const app = express()
app.listen(5500, () => {
  console.log('server is running')
})
```

## 注册和登录的模块化处理

### 路由的模块

router.js 文件

```js
const express=require('express');
const router=express.Router();
//引入// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')
//导入表单的判断
const userSchema=require('./judge')

//expressJoi(userSchema)表单验证中间件,若用户名和密码输入错误的时候,会在app.js文件中的错误中间件中提示

//注册事件
router.post('/reg',expressJoi(userSchema),})
//登录的请求
//此时登录的页面也需要进行表单的验证
router.post('/login',pressJoi(userSchema),)     });

})
//导出router
module.exports=router
```

### 请求函数的模块

```js
//导入数据库的模块
const db=require('./sql')
// 导入生成jwt的包
const jwt = require('jsonwebtoken');
// 解析jwt为对象的包
const expressJWT = require('express-jwt');
// 设置secret密钥
const secretKey = '你好我是小爱同学,不换型白色的挥洒'
//注册的请求
function regUser(req,res){
    //获取body的内容,
    const body=req.body;
    //对body的表单进行验证.在这里使用第三方插件来运行
    //使用数据库
    const str='insert into users.ev set?',
    //发送数据
 db.query(str,body,(err,results)=>{
if(err)return res.send({status:1,message:err.message})
           //添加成功以后根据affectRows来进行判断
          if(affectedRows!==1)return res.send({status:1,message:'注册失败'})
         if(affectedRows===1)return res.send({status:0,message:'注册成功'})
})
    //登录的请求
  function loginUser(res,req){
    //获取post请求的数据
    const body=req.body
    //查询sql的语句
    //根据用户名和密码来对数据库进行查询数据是否存在
    const str='select * from users.ev where username=? and password=?';
    //发送数据库的请求
    db.query(str,[body.username,body.password],(err,results)=>{
     if(err) return res.send({status:1,message:err.message}) ;
      //根据results返回的数组长度,判断数据是否存在
        if(rerults.length===0)return res.send({status:1,message:'登录失败'})
        //登录成功以后,服务器会向浏览器发送token的值,所以此时需要导入token的第三方插件
    //获取到的results是一个数组加对象的形式,所以需要获取到results[0],即可以得到登录的值
  /* //     results[0]:[

  RowDataPacket {
    id: 1,
    username: 'admin',
    password: '',
    email: null,
    user_pic: '',
    status: 0
  }
]*/
        //得到的值里面有一些重要的隐私所以我们发送到客户端的时候需要对内容进行隐藏
        results[0].password='';
            results[0].user_pic='';
        //此时进行token的生成,使用jwt.sing()的方法

/*res.send({status:0,message:'登录成功',token:jwt.sign(results[0], secretKey, { expiresIn: '30s' }) })} */
 //此时系统会出现错误
//Error: Expected "payload" to be a plain object.次数说明results[0]的部分不是一个普通的对象
//所以需要声明一个变量,保存进去
  const obj = { ...results[0] }
        res.send({ status: 0, message: '登陆成功', token: 'Bearer ' + jwt.sign(obj,
 /*次数不要忘记在token前加上Bearer */              secretKey, { expiresIn: '30s' }) })
    })
}

```

### 验证表单的模块

```js
// 导入 Joi 来定义验证规则
const Joi = require('@hapi/joi')
// 自定义表单的元素
const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string().pattern(/^[\S]{6,15}$/),
  },
}
module.exports = userSchema
```

### 发送数据库的模块

```js
npm i mysql
//下载mysql数据库
//导入数据库文件
const mysql=require('mysql');
const db=mysql.creatPool({
    //主机地址
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'user'

})
//测试连接数据库是否成功
db.query('select 1',(err,results)=>{
    console.log(results)
    //{1:1}即成功
})

//此时导出db模块
module.exports=db
```

# Promise

**什么是 promise?**

promise 是一个构造函数,在 promise.prototype 上有一个 then 的方法

![img](https://img-blog.csdnimg.cn/20190112161316164.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NoYWQ5Nw==,size_16,color_FFFFFF,t_70)

```js
//异步执行的机制和同步的执行机制不慎相同,在异步中,主要是跟文件的大小有关,和顺序无关.而同步的执行机制是从上往下执行的,和顺序是由关系的.
//此时我们访问三个不同的文件夹,三个文件夹的内容都是相同的.
//但当我们执行了fs.readFile以后,此时输出的内容会是a/b/c  a/c/b不一定是按照顺序读取的
const fs = require('fs')
fs.readFile('./a.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err.message)
  }
  console.log(data)
})
fs.readFile('./b.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err.message)
  }
  console.log(data)
})
fs.readFile('./c.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err.message)
  }
  console.log(data)
})
```

此时如果我们按照顺序读取的话,需要嵌套执行/

```js
const fs = require('fs')
fs.readFile('./a.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err.message)
  }
  console.log(data)
  fs.readFile('./b.js', 'utf8', (err, data) => {
    if (err) {
      return console.log(err.message)
    }
    console.log(data)
    fs.readFile('./c.js', 'utf8', (err, data) => {
      if (err) {
        return console.log(err.message)
      }
      console.log(data)
    })
  })
})
```

但此时代码过于冗余,而且可读性比较差,此时可以使用,ES6 提供的 promise 方法

promise 的使用方法

```js
var fs = require('fs')
console.log('1')
// 创建一个new的实例对象,在promise只有执行了异步的对象才会进行操作
// , 同步对象不会有影响,
//只要new了一个promise实例,就会立即执行这个promise所代表的异步操作
const promise = new Promise(function (resolve, reject) {
  console.log('2')
  fs.readFile('./a.js', 'utf8', function (err, data) {
    if (/* 异步操作成功 */ !err) {
      resolve(data)
    } else {
      reject(err)
    }
  })
})
console.log(3)
setTimeout(function () {
  console.log('地那个时期')
}, 0)
// 此时then中的function输入的就是resolve()函数
function th(data) {
  console.dir(data)
}
promise.then(th).catch(function (err) {
  console.log('读取文件失败' + err)
})
//此时打印的结果是:
//1
//2
//3
//地那个时期
//"console.log('nishishui ');\r\n"
```

使用 promise 方法解决异步的问题:

```js
var fs = require('fs')
// 创建一个new的实例对象,在promise只有执行了异步的对象才会进行操作
// , 同步对象不会有影响,
const promise = new Promise(function (resolve, reject) {
  // ... some code
  fs.readFile('./a.js', 'utf8', function (err, data) {
    if (/* 异步操作成功 */ !err) {
      resolve(data)
    } else {
      reject(err)
    }
  })
})
const promise1 = new Promise(function (resolve, reject) {
  // ... some code
  fs.readFile('./b.js', 'utf8', function (err, data) {
    if (/* 异步操作成功 */ !err) {
      resolve(data)
    } else {
      reject(err)
    }
  })
})
const promise2 = new Promise(function (resolve, reject) {
  // ... some code
  fs.readFile('./c.js', 'utf8', function (err, data) {
    if (/* 异步操作成功 */ !err) {
      resolve(data)
    } else {
      reject(err)
    }
  })
})

// 此时then中的function输入的就是resolve()函数

promise
  .then(function (data) {
    console.dir(data)
    return promise1 //return了一个promise的实例化对象以后,则下面的then里面的函数就是promise1中的resolve方法
  })
  .then(function (data) {
    console.dir(data)
    return promise2 //此时如果不写这句话,则返回的是undefined
  })
  .then(function (data) {
    console.dir(data)
  })
  .catch(function (err) {
    console.log('读取文件失败' + err)
  })
```

此时代码中有多处的地方重复,所以可以使用函数进行封装一下

封装后的 promise

```js
var fs = require('fs')
// 创建一个new的实例对象,在promise只有执行了异步的对象才会进行操作
// , 同步对象不会有影响,
function promise(path) {
  return new Promise(function (resolve, reject) {
    // ... some code
    fs.readFile(path, 'utf8', function (err, data) {
      if (/* 异步操作成功 */ !err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 此时then中的function输入的就是resolve()函数
promise('./a.js')
  .then(function (data) {
    console.dir(data)
    return promise('./b.js') //return 了一个promise的实例化对象以后,则下面的then里面的函数就是promise1中的resolve方法
  })
  .then(function (data) {
    console.dir(data)
    return promise('./c.js')
  })
  .then(function (data) {
    console.dir(data)
  })

  //获取失败的信息
  .catch(function (err) {
    console.log('读取文件失败' + err)
  })
//无论是否报错都会执行的
```

## 异步函数 async

异步函数是异步编程语法解决的终极方案,可以使代码变得清晰明了,不再有回调函数的嵌套

```js
// 在普通函数定义的前面机上async关键字,普通的函数就变成了异步函数

//异步函数返回的是promise对象

//在异步函数的内部使用return关键字进行结果的返回,结果会被包裹在promise对象中,return 关键字替代了resolve 的方法

//调用throw 的方法的时候抛出程序出错,后面的代码不会被执行
console.log('我是1')
async function fn() {
  throw '你好呀'
  setTimeout(() => {
    console.log('你好')
  }, 0)
}
fn()
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) {
    console.log(err)
  })
```

## await 关键字

注意:await 关键字只能出现在异步函数中

await promise await 后面只能写 promise 的对象,写其他 API 是不可以的

await 关键字可以暂停异步函数向下执行

```js
//awiat关键字只能使用在async函数中
async function fn() {
  return 'p1'
}
async function fn1() {
  return 'p2'
}
async function fn3() {
  return 'p3'
}
async function rn() {
  const Fn = await fn()
  const Fn1 = await fn1()
  const Fn2 = await fn3()
  console.log(Fn)
  console.log(Fn1)
  console.log(Fn2)
}
fn()
```

## 使用 promisify 封装文件的调用

```js
const fs = require('fs')
//改造先有的异步API,返回promise对象

const promisify = require('util').promisify
// 调用promisify方法改造现有的api
const read = promisify(fs.readFile)
async function run() {
  let l1 = await read('./a.js', 'utf8')
  let l2 = await read('./b.js', 'utf8')
  let l3 = await read('./c.js', 'utf8')
  console.log(l1, l2, l3)
}
run()
```

# CRUD 案例

### 起步

- 初始化

```html
npm init -y
```

- 安装依赖安装 package,.json 的依赖项

- - 安装 express

```
npm i -S express
```

- - 安装配置 art-template 模板

```
npm install --save art-template express-art-template
```

```
app.engine('html', require('express-art-template'));
```

- - 获取表单 post 请求的 API：body-parser

```
npm install --save body-parser
```

```js
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```

- - 安装其他工具

```
npm i -S bootstrap@3.3.7
npm i -S jquery
```

- 模板处理

### 路由设计

| 请求方法 | 请求路径         | get 参数 | post 参数                      | 备注             |
| -------- | ---------------- | -------- | ------------------------------ | ---------------- |
| GET      | /students        |          |                                | 渲染首页         |
| GET      | /students/new    |          |                                | 渲染添加学生页面 |
| POST     | /students/new    |          | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id       |                                | 渲染编辑页面     |
| POST     | /students/edit   |          | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id       |                                | 处理删除请求     |

### 路由提取模块

router.js：

```js
var express = require('express')
var fs = require('fs')
var Student = require('./student')

// 创建一个路由容器
var router = express.Router()

// 把路由挂载到 router 路由容器中
router.get('/students', function (req, res) {})

router.get('/students/new', function (req, res) {})

router.post('/students/new', function (req, res) {})

router.get('/students/edit', function (req, res) {})
router.post('/students/edit', function (req, res) {})
router.get('/students/delete', function (req, res) {})

// 把 router 导出
module.exports = router
```

app.js：

```js
var router = require('./router')

// 把路由容器挂载到 app 服务中
app.use(router)
```

## 设计操作数据的 api

#### 自己编写模板

1. 处理模板

2. 配置开放静态的资源

3. 配置模板引擎

4. 简单的路由设计 /

5. 提取路由模块

6. 由于接下来的一些列的操作都需要数据,所以需要封装

# MongoDB

参考 [MongoDB 菜鸟教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)

### 安装与配置 MongoDB

- 下载 MongoDB : [**MongoDB 3.4.10 百度云地址** ](https://pan.baidu.com/s/1-8cKmiMsv7vmLVV8Pp8_7w)（提取码: r96j）
- 安装 MongoDB
- 配置环境变量：`path` 变量 =>`C:\Program Files\MongoDB\Server\3.4\bin`
- 检查安装是否成功：`cmd` 窗口 => `mongod --version`

### 启动和关闭数据库

- 启动：`打开控制台输入mongod`

注意：

1. 第一次执行命令前，在 C 盘下新建目录：`C:\data\db`
2. 如果想要修改默认的数据存储目录，可以：`mongod --dbpath=数据存储目录路径`
3. 首次启动可以在 c 盘的目录下的新建 data 的里面新建 bd 文件才能够使用

- 关闭：`Ctrl+C`

### 连接和退出数据库

- 连接：`mongo`
- 退出：`exit`

### MongoDB 基本命令

- 查看显示所有数据库：`show dbs`
- 查看当前操作的数据库：`db`
- 切换到指定数据库（若没有则会创建）：`use 数据库名称`
- 插入数据：`db.students.insertOne({"name":"Lyy"})`
- 查看数据库的表：`show collections`
- 查看指定表的数据：`db.students.find()`

## MongoDB 数据库的基本概念

- 可以有数据库

- 一个数据可可以有多个集合

- 一个集合可以有多个文档

- ```js
  qq:{
      user:[

      ],
          product[],
  },
  ```

-

### 在 Node 中操作 MongoDB

- 使用官方的 [mongodb 包](https://www.npmjs.com/package/mongodb)来操作
- 使用[第三方包 mongoose](https://mongoosejs.com/) 来操作

#### 起步

参考：[mongoose 官方指南](https://mongoosejs.com/docs/index.html)

- 安装

```
npm i mongoose
```

- Hello World

```js
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
// 创建一个模型（就是在设计数据库）
const Cat = mongoose.model('Cat', { name: String })
// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' })
// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'))
```

#### 官方指南

1. 设计 Schema 发布 Model

```js
var mogoose = require('mongoose')
var Schema = mongoose.Schema

// 1.连接数据库
mongoose.connect('mongodb://localhost:27017/test')

// 2.设计文档结构
var userSchema = new Schema({
  userName: {
    type: String,
    required: true, // 非空
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
})

// 3.将文档结构发布为模型
// mongoose.model()方法用来将一个架构发布为模型
// 第一个参数：表示你的数据库名称（大写名词单数字符串），这里的 User 会变成 users 集合名称
// 第二个参数：架构 Schema
// 返回值：模型构造函数
var User = mongoose.model('User', userSchema)

// 4.使用模型构造函数操作 users 集合中的数据（增删改查）
```

1. 新增数据

```js
// 添加数据
var admin = new User({
  userName: 'admin',
  password: '123456',
  email: 'admin@admin.com',
})
// 持久化
admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

1. 查询数据

- 查询所有数据

```js
// 查询所有数据
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

- 按条件查询

```js
// 按条件查询
User.find(
  {
    userName: 'admin', // 查询用户名为admin的
  },
  function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  }
)
```

1. 删除数据

```js
// 删除数据
User.deleteOne(
  {
    userName: 'admin',
  },
  function (err) {
    if (err) {
      return handleError(err)
    } else {
      console.log('删除成功')
    }
  }
)
```

```js
//根据条件删除一个
Model.findOneAndRemove(condition, [option], callback)

//根据id删除一个
Model.findByIdAndRemove(Id, option, callback)
```

1. 更新数据

```js
// 更新数据
User.updateOne(
  {
    _id: '5e37e693c84d393bdcdd09db',
  },
  {
    userName: 'admin',
    password: '000000',
    email: 'admin@admin.com',
  },
  function (err, res) {
    if (err) {
      console.log('更新失败')
    } else {
      console.log('更新成功')
    }
  }
)
```

---

# Puppeteer

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 [DevTools](<https://zhaoqize.github.io/puppeteer-api-zh_CN/(https://chromedevtools.github.io/devtools-protocol/)>) 协议控制 Chromium 或 Chrome。Puppeteer 默认以 [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) 模式运行，但是可以通过修改配置文件运行“有头”模式。

你可以在浏览器中手动执行的绝大多数操作都可以使用 Puppeteer 来完成！ 下面是一些示例：

- 生成页面 PDF。

- 抓取 SPA（单页应用）并生成预渲染内容（即“SSR”（服务器端渲染））。

- 自动提交表单，进行 UI 测试，键盘输入等。

- 创建一个时时更新的自动化测试环境。 使用最新的 JavaScript 和浏览器功能直接在最新版本的 Chrome 中执行测试。

- 捕获网站的 [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)，用来帮助分析性能问题。

- 测试浏览器扩展。

- Puppeteer 使用起来和其他测试框架类似。你需要创建一个 `Browser` 实例，打开页面，然后使用 [Puppeteer 的 API](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#)。

  **Example** - 跳转到 https://example.com 并保存截图至 _example.png_:

  文件为 **example.js**

  ```js
  const puppeteer = require('puppeteer')

  ;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://example.com')
    await page.screenshot({ path: 'example.png' })

    await browser.close()
  })()
  ```

  在命令行中执行

  ```bash
  node example.js
  ```

**Example** - 创建一个 PDF。

文件为 **hn.js**

```js
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' })
  await page.pdf({ path: 'hn.pdf', format: 'A4' })

  await browser.close()
})()
```

在命令行中执行

```bash
node hn.js
```

查看 [`Page.pdf()`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagepdfoptions) 了解跟多内容。
