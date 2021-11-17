const express = require("express");
const app = express();
// 依托静态资源

const assets = express.static("./public");
app.use(assets);
app.listen(8081, () => {
  console.log("服务器启动了");
});
