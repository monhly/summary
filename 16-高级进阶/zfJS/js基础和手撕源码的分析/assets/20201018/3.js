/*
 * ES6中新增一个内置的类：Promise 承诺/约定模式，基于这种模式可以有效的处理异步编程 
 */
/* 
let data = null;
// 基于JQ->AJAX“异步”从服务器获取数据「真实项目中从服务器获取数据也都是异步的」
$.ajax({
    url: '/api/1.json',
    method: 'GET',
    dataType: 'json',
    success: function (result) {
        // result就是基于JQ的ajax方法从服务器获取的结果
        console.log(result); //第二次：[1]
        data = result;
    }
});
console.log(data); //第一次：null
*/
// 需求：首先从服务器端基于“/api/1”这个接口获取数据；紧接着把获取的某些数据作为参数，再基于“api/2”获取其它的数据；最后在第二次数据获取成功后，再基于“api/3”获取新的数据...也就是第一个请求成功才可以获取第二个，第二个成功才可以获取第三个...->“AJAX的串行”
// 传统在实现异步操作，并且是串行的模式下，基本上都是回调函数嵌套回调函数，实现非常的恶心的“回调地狱”问题
/* $.ajax({
    url: '/api/1.json',
    dataType: 'json',
    success(result) {
        console.log('第一次请求->', result);

        // ajax串行：第一个请求成功才可以发送下一个请求
        $.ajax({
            url: '/api/2.json',
            dataType: 'json',
            success(result) {
                console.log('第二次请求->', result);

                $.ajax({
                    url: '/api/3.json',
                    dataType: 'json',
                    success(result) {
                        console.log('第三次请求->', result);
                        console.log('OK');
                    }
                });
            }
        });
    }
}); */

// 此时我们需要一种优秀的代码管理模式，能够有效的管理异步编程的中的代码，通过这种代码管理的思想，让代码开发起来更便捷、维护起来也很方便、可读性也更强... => JS的设计模式  Promie设计模式就是管理异步编程的
const api1 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/1.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};
const api2 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/2.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};
const api3 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/3.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};

/* 
api1().then(result => {
    console.log('第一次请求->', result);
    return api2();
}).then(result => {
    console.log('第二次请求->', result);
    return api3();
}).then(result => {
    console.log('第三次请求->', result);
    console.log('OK');
}); 
*/

(async function () {
    let result = await api1();
    console.log('第一次请求->', result);

    result = await api2();
    console.log('第二次请求->', result);

    result = await api3();
    console.log('第三次请求->', result);
})();

// 在JS中，除了ajax请求是异步的编程的，还有一些操作也是异步编程
//   + 事件绑定
//   + 定时器
//   + Promise/async/await
//   + requestAnimationFrame
//   + ...

/* setTimeout(() => {
    console.log(1); //第二步
}, 1000);
console.log(2); //第一步 */