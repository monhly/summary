/**
 * 基于canvas实现刮刮卡的效果
 */
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 210, 72);

var isDraw = false;
// 监听鼠标
canvas.onmousedown = function () {
  // 鼠标抬起
  isDraw = true;
 
};
/**
 * 
 * @param {*} arr 
 * arr[
 * text:传入的文字;
 * randomNum:检测的概率
 * ]
 */



canvas.onmousemove = function (e) {
  // 进行画圆的绘制
  /**
   * 获取鼠标的位置,根据位置进行绘制
   */
  /**
   * beginPath
   * closePath
   * 解决路径重新开辟的问题
   */
  
  if (isDraw) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    ctx.beginPath();
    ctx.fillStyle = "#ccc";
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};

canvas.onmouseup = function () {
  // 鼠标点击
  isDraw = false;
  console.log("我被点击了");
};
