/*
 * THIS的几种情况
 *   + 事件绑定
 *   + 函数执行
 *     + 自执行函数
 *     + 回调函数
 *     + ...
 *   + 构造函数执行
 *   + 基于call/apply/bind改变函数中的this
 *   + 箭头函数中没有自己的this，所用到的this是使用其上下文中的 
 */
// Function.prototype -> call/apply/bind 所有的函数都可以调取这三个办法

/* Function.prototype.call = function call(context) {
    // this->fn
    // context->obj
    // ...
}; */

/* window.name = 'WINDOW';
let obj = {
    name: '珠峰培训',
    age: 11
};

function fn(x, y) {
    console.log(this, x + y);
} */

// fn(); //this->window
// obj.fn(); //Uncaught TypeError: obj.fn is not a function
//--------
// fn.call(obj); //this->obj  fn先基于__proto__找到Function.prototype.call，把call方法执行的时候，call方法内部实现了一些功能：会把fn执行，并且让fn中的this变为第一个实参值
// fn.call(obj, 10, 20); //this->obj x->10 y->20
// fn.call(); //this->window 严格模式下undefined
// fn.call(null); //this->window 严格模式下null 「传递的是undefiend也是如此」
// fn.call(10, 20); //this->10「对象」 x->20  y->undefined
//--------
// // apply的作用和细节上和call一样，只有一个区别：传递给函数实参的方式不一样
// fn.call(obj, 10, 20);
// fn.apply(obj, [10, 20]); //最后结果和call是一样的，只不过apply方法执行的时候要求：传递给函数的实参信息都要放置在一个数组中，但是apply内部也会向call方法一样，把这些实参信息一项项的传递给函数


//==========================================
/* 需求：获取数组中的最大值 */
// let arr = [10, 30, 15, 36, 23];

// 借用Math.max
/*
// Math.max(10, 30, 15, 36, 23) ->36 获取一堆数中的最大值
// Math.max([10, 30, 15, 36, 23]) ->NaN 传递一个数组是不行的

// // ES6展开运算符：
// let max = Math.max(...arr);
// console.log('数组中的最大值是:' + max);

// // 基于apply的特点
// let max = Math.max.apply(null, arr);
// console.log('数组中的最大值是:' + max);

// // 字符串拼接成为最终想要的表达式
// let str = `Math.max(${arr})`;
// let max = eval(str);
// console.log('数组中的最大值是:' + max);
*/

// 先排序
/* 
arr.sort(function (a, b) {
    return b - a;
});
let max = arr[0];
console.log('数组中的最大值是:' + max); 
*/

// 假设法
/* 
let max = arr[0];
for (let i = 1; i < arr.length; i++) {
    let item = arr[i];
    if (item > max) {
        max = item;
    }
}
console.log('数组中的最大值是:' + max); 
*/
/* 
let max = arr.reduce((result, item) => {
    return item > result ? item : result;
});
console.log('数组中的最大值是:' + max); 
*/

//==========================================
/* 需求：把类数组集合转换为数组集合 */
/* 
Array.prototype.slice = function slice() {
    // 重写内置的slice，实现浅克隆
    // this->ary
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        arr.push(item);
    }
    return arr;
};
let ary = [10, 20, 30];
let newAry = ary.slice(); //不传递或者传递0 -> 数组的浅克隆
console.log(newAry, newAry === ary); 
*/

/* function sum() {
    // arguments:实参集合，它是一个类数组，不是Array的实例，所以不能直接调用Array.prototype上的方法，但是结构和数组非常的相似，都是索引+length
    // let arr = [];
    // for (let i = 0; i < arguments.length; i++) {
    //     let item = arguments[i];
    //     arr.push(item);
    // }
    let arr = [].slice.call(arguments);
    return arr.reduce((result, item) => item + result);
} */

/*
function sum(...arr) {
    // 基于剩余运算符获取的实参集合本身就是一个数组
    
    // Array.from:可以把一个类数组(或者Set)转换为数组
    // let arr = Array.from(arguments);

    // 基于展开运算符把类数组中的每一项拿出来，分别赋值给数组
    // let arr = [...arguments];
    return arr.reduce((result, item) => item + result);
}
*/
// let total = sum(10, 20, 30, 40);
// console.log(total);  


//====================
/* let obj = {
    name: '珠峰培训',
    age: 11
};

function fn(x, y) {
    console.log(this, x, y);
} */

/*
// 事件绑定的时候方法是没有执行的，只有事件触发，浏览器会帮助我们把方法执行
// this->body
// x->MouseEvent 事件对象「浏览器不仅帮助我们把方法执行，而且还把存储当前操作的信息的事件对象传递给函数」
// y->undefined
document.body.onclick = fn;

// 设置一个定时器（此时绑定的函数没有执行，此时只是绑定一个方法），1000MS后，浏览器会帮助我们把fn执行
// this->window
// x->undefined
// y->undefined
setTimeout(fn, 1000);
*/

// 我们期望:不论是事件触发，还是定时器到时间，执行对应的方法时，可以改变方法中的this，以及给方法传递实参信息

// =>直接下属这种操作办法是不可以的：call/apply在处理的时候，会把函数立即执行，也就是在事件绑定或者设置定时器的时候，fn就执行了，而不是等待事件触发或者定时器到时间后再执行  “立即处理的思想”
// document.body.onclick = fn.call(obj, 10, 20);
// setTimeout(fn.call(obj, 10, 20), 1000);

// =>“预先处理思想「柯理化函数」”
// 我们绑定方法的时候(不论是事件绑定还是设置定时器)，先绑定一个匿名函数，事件触发或者达到时间，先把匿名函数执行，在执行匿名函数的时候，再把我们需要执行的fn执行，此时就可以基于call/apply改变this和参数信息了
/* document.body.onclick = function (ev) {
    //this->body
    fn.call(obj, 10, 20, ev);
};
setTimeout(function () {
    //this->window
    fn.call(obj, 10, 20);
}, 1000); */
// bind相当于call/apply来讲，并不会把函数立即执行，只是实现处理了要改变的this和参数，一切的执行还是按照原有的时间或者触发节点进行
// document.body.onclick = fn.bind(obj, 10, 20);
// setTimeout(fn.bind(obj, 10, 20), 1000);


//====================
/* // 箭头函数没有自己的this
let obj = {
    name: '珠峰培训',
    age: 11,
    fn: function () {
        // this->obj
        return () => {
            this.name = 'zhufeng2020';
            console.log(this);
        };
    }
};
let f = obj.fn();
f.call(100); //箭头函数没有this（方法执行的时候不存在初始this这一项操作），所以基于call/apply操作它都是无用的，没有this，改啥？ */

/* let obj = {
    name: '珠峰培训',
    age: 11,
    fn: function () {
        // this->obj
        let that = this;
        return function () {
            // this->window
            // 如果需要改变obj.name，可以用that替换this
            that.name = 'zhufeng2020';
            console.log(this);
        };
    }
};
let f = obj.fn();
f(); */