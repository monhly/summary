/*
 * 进程 & 线程
 *   一个进程中可能包含多个线程
 *   进程：程序（浏览器打开一个页面，就会开辟一个进程）
 *   线程：处理任务，一个线程同时只能处理一个任务
 * 
 * 浏览器是多线程的
 *   + HTTP网络线程：用于资源文件的加载
 *   + GUI渲染线程：用于页面自上而下渲染，最后绘制出页面
 *   + JS渲染线程：专门用于渲染我们的JS代码的
 *   + ...
 * JS是单线程的：浏览器只会开辟一个线程用来渲染JS代码，所以JS的本质都是『同步』的（当前这件事情处理完成后，才能处理下一个事情，不能同时干两件事）
 * 
 * 但是JS中是有「异步」编程的代码的，但是此处的异步编程也不是让其同时处理多件事情，只不过是基于浏览器的多线程性，再结合EventLoop事件循环机制，构建出来的异步效果！！
 * 
 * 异步编程的代码：
 *  「宏任务」
 *   + 定时器：设置定时器是同步的过程，而“间隔[interval]这么长时间后，触发绑定的方法执行”这个事情是异步的
 * 
 *  「微任务」
 */
// 定时器的返回值是一个数字，代表当前是系统中的第几个定时器，清除的时候也是基于这个数字清除
/* let n = 0;
let timer = setTimeout(() => {
    n++;
    console.log(n); //->(2) 1
}, 1000);
console.log(n); //->(1) 0 */

//======================
/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
// console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
// console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */

/* setTimeout(() => {
    console.log(1);
}, 0); //设置零也不是立即执行：而是需要等待浏览器最快的反应时间 谷歌4~6MS
console.log(2);
while (1) {
    // do somthing
    // 死循环会导致主线程永远结束不了：下面同步代码不会执行，所以的事件队列的任务都不会执行
}
console.log(3);
setTimeout(() => {
    console.log(4);
}, 10);
console.log(5); */