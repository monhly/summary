/*
 * 宏任务：
 *   + 定时器：监听时间，到达时间触发绑定的回调函数
 *   + 事件绑定：监听事件，事件触发执行绑定的方法
 *   + AJAX/FETCH等创建的网络请求：从服务器请求数据
 *   + ...
 * 微任务：
 *   + Promise:then/resolve(reject)通知注册的onfulfilled/onrejected方法执行
 *   + async/await
 *   + ...
 */

// ES7中新增的async/await：generator的语法糖
// async修饰符的作用：让一个函数返回一个Promise实例（默认都是成功状态，除非本身就是返回一个Promise实例，这样最后结果以自己返回的实例为主）
/* async function fn() {
    // return 10;
    // return Promise.reject();
}
console.log(fn()); */

// 函数中如果需要使用await，则所在的函数必须基于async修饰
// await可以使异步的编程模拟出同步的效果
//   + await后面一般会放置一个Promise实例（其他正常值也是可以的）
//   + 等待Promise状态为成功后，获取成功的结果，并且执行函数体中await下面的代码
/* function handle() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('OK');
        }, 1000);
    });
}
async function fn() {
    // 先执行handel，返回一个Promise实例
    //   + 接下来等待，等待Promise实例变成成功态「再此期间，函数体中await下面代码都不会执行」
    //   + 当状态变为成功，把成功的结果给result，继续执行下面代码
    let result = await handle();
    console.log(result); //=>1S后输出'OK'

    // 虽然await后面放置的是一个10,肯定算是成功的，但是await下面代码也不是立即执行的，也需要等，等待同步任务执行完
    //  => await本身是异步的(await下面的代码，需要等到await后面的Promise实例「不是实例也会当做实例来处理」变为成功，才会执行后面的代码)，模拟出来一个类似于同步的效果
    let n = await 10;
    console.log(n); //=>10

    // 如果await后面的Promise实例是失败的，则不再处理之前存放的微任务（也就是下面的代码）：因为没处理失败，浏览器抛出异常 Uncaught (in promise) NO  =>用try catch 解决
    try {
        let m = await Promise.reject('NO');
        console.log(m);
    } catch (err) {

    }
}
fn(); */


/* async function fn() {
    await 10; //遇到await，先处理后面紧跟着的代码...接下来等到Promise实例成功「同时把函数体中await下面的代码作为一个“异步的微任务”存放到事件队列中」
    console.log(1); //->(2)
}
fn();
console.log(2); //->(1) */



async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');