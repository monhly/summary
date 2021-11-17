// let p1 = new Promise(); //Uncaught TypeError: Promise resolver undefined is not a function 要求NEW的时候，必须传递一个函数进来才可以 [executor]

// new Promise的时候
//   + 会立即执行传递的executor函数
//     + 在executor函数中一般用来管控一个异步的操作(不写异步的也可以)
//     + 而且传递给executor函数两个参数：resolve, reject，并且这个两个参数都是函数
//   + 创造Promise类的一个实例p1
//     + [[PromiseState]]promie状态：pending准备状态  fulfilled/resolved成功(已兑现)  rejected失败(已拒绝)
//     + [[PromiseResult]]promise值：默认是undefined，一般存储成功的结果或者失败的原因
//     + p1.__proto__ -> Promise.prototype：then/catch/finally
/* let p1 = new Promise(function (resolve, reject) {
    // 执行resolve控制实例的状态变为成功，传递的值100是成功的结果
    //   + [[PromiseState]]:'fulfilled'
    //   + [[PromiseResult]]:100
    // 执行reject控制实例的状态变为失败
    //   + [[PromiseState]]:'rejected'
    //   + [[PromiseResult]]:0
    // 如果executor中的代码执行报错，则实例的状态也会变为失败态，并且[[PromiseResult]]是报错的原因
    // 但是一但状态从pending改变为fulfilled或者rejected，都无法再次改变其状态
    console.log(a);
}); */


// Promise是如何管控异步编程的？
//   + new Promise的时候创建一个promie实例，此时在executor函数中管理一套异步的代码
//   + 后期等异步操作成功或者失败的时候，执行resolve/reject，以此来控制promise实例的状态和结果
//   + 根据状态和结果，就可以控制基于.then注入的两个方法中的哪一个去执行了
// 下述代码执行的顺序
//   1.new Promise
//   2.执行executor：设置一个异步定时器
//   3.执行p1.then注入两个方法「注入的方法会保存起来」
//   ----等待1000ms
//   4.执行定时器的回调函数：执行resolve改变promise状态和值
//   5.通知之前基于then注入的两个方法中的第一个执行
/* let p1 = new Promise((resolve, reject) => {
    // new Promise的时候立即执行executor，在executor函数中管理了一个异步编程代码「此时状态是pending」；当异步操作到达指定时间，开始执行的时候（理解为异步操作成功），此时我们通过执行resolve，把promise状态修改为fulfilled；
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});
p1.then(result => {
    // 当p1实例的状态修改为fulfilled的时候，通知传递的第一个函数执行，result->[[PromiseResult]]
    console.log('成功->', result);
}, reason => {
    // 当p1实例的状态修改为rejected的时候，通知传递的第二个函数执行，reason->[[PromiseResult]]
    console.log('失败->', reason);
}); */

/* let p1 = new Promise((resolve, reject) => {
    console.log(1); //->(1)
    resolve('OK'); //=>立即修改状态和值，并且通知基于THEN注入的方法执行「问题：.THEN还没有执行，方法还没有被注入，不知道该通知谁来执行」，所以此时需要把“通知方法执行的操作”先保存起来「放入到等待任务队列中」 ->“通知方法执行”这个操作本身是异步的，需要等待方法注入完成后再通知其执行的
    console.log(2); //->(2)
});
p1.then(result => {
    console.log('成功->', result); //->(4)
}, reason => {
    console.log('失败->', reason);
});
console.log(3); //->(3) */

/* let p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve('OK');
        console.log(1); //->(1) 再次说明，不论是否基于THEN注入了方法，执行resolve/reject的时候“修改状态和值”是同步的「立即处理」，但是“通知对应注入方法执行”的这个任务就是异步操作的「不会立即处理，只是把它排到等待任务队列中，当其它事情处理完，再次返回头，通知对应注入的方法执行」
    }, 1000);
});
p1.then(result => {
    console.log(2); //->(2)
}); */