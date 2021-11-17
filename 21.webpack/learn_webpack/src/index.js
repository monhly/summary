import { b } from "./b";
console.log(b);
import a from "./a";
// import './style.css'
//全局引入jquery
import $ from "jquery";
console.log("获取的全局", $, window.$);
//暴露全局的loader
import axios from "axios";
console.log(a);
const d = () => {
  console.log("我是新数据");
};

console.log('process.env.NODE_ENV',process.env.NODE_ENV)


var xhr = new XMLHttpRequest();
// open后面有三个参数：
// 规定请求的类型、URL 以及是否异步处理请求。
// method：请求的类型；GET 或 POST
// url：文件在服务器上的位置
// async：true（异步）或 false（同步） 默认为true
xhr.open("get", "/some/path");

// 发送请求到后端（服务器）
xhr.send();

// 当请求被发送到服务器时，我们需要执行一些基于响应的任务。
// 每当 readyState 改变时，就会触发 onreadystatechange 事件。
// readyState 属性存有 XMLHttpRequest 的状态信息。
// 在xhr的准备状态发生改变的时候，调用该方法
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
// console.lo('哈哈')
const data = "哈哈";
axios.get("/some/path").then((res) => {
  console.log("获取的res", res);
});
