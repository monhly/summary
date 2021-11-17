const fs = require("fs");
//创建目录
fs.mkdir("./css", (err) => {
  console.log("创建成功");
});

//写入文件
fs.writeFile("./index.html", "测试html", (err) => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功");
});
//向文件夹中追加文件,不进行覆盖的操作
fs.appendFile("./index.html", "append文件夹", (err) => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功");
});
//读取文件
fs.readFile("./index.html", "utf8", (err, data) => {
  if (err) {
    console.log("读取失败");
    return;
  }
  console.log(data);
});
