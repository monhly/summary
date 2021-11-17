var http = require("http");
const testApi = require("./test");
//使用代码块 node-http-server
console.log(testApi);
http
  .createServer(function (request, response) {
    //设置响应头
    response.setHeader("Content-Type", "text/html");
    console.log(request.headers.referer);
    request.url = request.url.replace("/", "");
    const myURL = new URLSearchParams(request.url);
    console.log(myURL);
    response.writeHead(200, { "Content-Type": "text/json" });
    response.end("<h1>这是汉字</h1>");
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
