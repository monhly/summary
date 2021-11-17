//基于vue2源码手动实现数据的响应式
const info = {
  counter: 100,
}
function doubleCounter() {
  console.log(info.counter++)
}
doubleCounter()
