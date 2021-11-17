const fs = require("fs");
//创建一个可读入的流
// var readStream = fs.createReadStream("./write.txt");

// var str = "";
// readStream.on("data", (data) => {
//   str += data;
// });
// readStream.on("end", () => {
//   console.log(str);
// });
// readStream.on("error", () => {
//   console.log("读取失败的信息");
// });

//创建一个读入的流
// var writeStream = fs.createWriteStream("./test.txt");
// writeStream.write(str);
// writeStream.end();
// writeStream.on("finish", () => {
//   console.log("写入完成");
// });

//将读入的流写入

// readStream.pipe(writeStream);

//创建一个可读入的流
var readStream = fs.createReadStream("./test.txt");
var str = "";
readStream.on("data", (data) => {
  str += data;
});
readStream.on("end", () => {
  console.log("读写完毕");
  console.log(str);
});

//创建一个写入流
var writeStream = fs.createWriteStream("./write.txt");
// writeStream.write("哈哈哈");
// writeStream.end();
// writeStream.on("finish", () => {
//   console.log("写入完成");
// });

//将读入的流写入写入的流文件
readStream.pipe(writeStream);
