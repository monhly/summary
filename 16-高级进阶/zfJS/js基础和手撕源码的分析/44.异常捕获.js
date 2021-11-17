//前端异常捕获上包
/**
 * js语法错误,代码异常
 * ajax请求异常
 * 静态资源加载异常
 * Promise异常
 * Iframe异常
 * 跨域 script error
 * 崩溃和卡顿
 */

//1.使用trycatch捕获异常
//缺点:无法捕获异步的错误
// const func = () => {
//     console.log('fun start')
//     err
//     console.log('fun end')
// }



// try {
//     setTimeout(() => {
//         func()
//     })
// } catch (err) {
//     console.log('err', err)
// }

//2.window.onerror捕获异常错误
//不能捕获到静态资源异常,或者是接口异常,
const func = () => {
    console.log('fun start')
    err
    console.log('fun end')
}

setTimeout(() => {
    func()
})

window.onerror = (...args) => {
    console.log('args:', args)
}

//3.使用window.addEvenlistener()
//当一项资源加载失败的时候,会触发一个error的事件,
window.addEventListener('error', (error) => { console.log('捕获到异常：', error); }, true)

//4.promise catch可以捕获到异步的error
let p = new Promise
p.catch((err) => {
    console.log('获取的异常', err);
})

//5.全局捕获promise的异常,unhandledrejection
window.addEventListener("unhandledrejection", function(e) {
    e.preventDefault();
    console.log('捕获到异常：', e);
    return true;
});

//6.vue中的异常捕获
Vue.config.errorHandler = (err, vm, info) => {
    console.error('通过vue errorHandler捕获的错误');
    console.error(err);
    console.error(vm);
    console.error(info);
}
window.addEventListener('load', function() {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function() { sessionStorage.setItem('time_before_crash', new Date().toString()); }, 1000);
});
window.addEventListener('beforeunload', function() { sessionStorage.setItem('good_exit', 'true'); });
if (sessionStorage.getItem('good_exit') && sessionStorage.getItem('good_exit') !== 'true') { /*        insert crash logging code here    */ alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash')); }