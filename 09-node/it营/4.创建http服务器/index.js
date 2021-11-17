//基于http创建静态的服务器
var http = require("http");
var fs = require("fs");
var path = require("path");
http
  .createServer(function (request, response) {
    //获取请求的url
    let pathname = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });
    if (pathname === "/") {
      fs.readFile("./index.html", (err, data) => {
        response.end(data);
      });
    } else if (pathname === "/login") {
      fs.readFile("./login.html", (err, data) => {
        response.end(data);
      });
    } else {
      fs.readFile("./404.html", (err, data) => {
        response.end(data);
      });
    }
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
