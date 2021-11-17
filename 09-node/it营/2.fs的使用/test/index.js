//基于fs模块进行练习

const fs = require("fs");
/**
 * 判断服务器中有没有upload目录,如果没有就进行创建这个目录,如果有的话,就不进行操作
 *
 */
//判断是否由此文件夹
fs.access("./upload", (err, data) => {
  if (err) {
    console.log(err);
    mkdir();
    return;
  }
  console.log(data);
});
function mkdir() {
  fs.mkdir("./upload", (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
