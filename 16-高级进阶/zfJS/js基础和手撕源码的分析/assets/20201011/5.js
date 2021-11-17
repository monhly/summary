// 手动实现call方法
// Function.prototype.calls=function(context,...params){
//     console.log('得到的this',this);
//     // 得到的this.就是fns函数本身,
//     context.xxx=this
//     let result = context.xxx(...params);
//     delete context.xxx; //用完后删除临时增加的属性，不改变原始的数据结构
//     return result;
//     // context就是传入的参数
// }
// function fns(add,num) {
//     return add+num
// }
// let obj={
//     name:'好的',

// }
// let adds=fns.calls(obj,20,30)
// console.log('adds',adds)
// call实现的思路：把需要执行的函数fn 和 需要改变的this指向obj 关联在一起 -> obj.xxx=fn，此时我们只需要 obj.xxx() 就相当于把fn执行，而且函数中的this就是obj
/* let obj = {
    name: '珠峰培训',
    age: 11,
    fn: fn
};
function fn(x, y) {
    console.log(this);
    return x + y;
}
let result = obj.fn(10, 20);
console.log(result); */

/* Function.prototype.call = function call(context, ...params) {
    // this->fn 当前要执行的函数
    // context->obj 需要改变的this
    // params->[10,20] 需要给函数传递的实参信息
    context.xxx = this;
    let result = context.xxx(...params);
    delete context.xxx; //用完后删除临时增加的属性，不改变原始的数据结构
    return result;
}; */

/* 
// 优化1：临时给context设置的属性不能和原始对象中的属性冲突
// 优化2：参数的处理
//   + context不传递或者传递null，最后要改的this都会是window
//   + 必须要保证context都是引用数据类型的值（不论你传递给我的是啥类型的）
Function.prototype.call = function call(context, ...params) {
    context == null ? context = window : null;
    !/^(object|function)$/.test(typeof context) ? context = Object(context) : null;
    let key = Symbol('KEY'),
        result;
    context[key] = this;
    result = context[key](...params);
    delete context[key];
    return result;
};

let obj = {
    name: '珠峰培训',
    age: 11,
    [Symbol('KEY')]: '哈哈'
};

function fn(x, y) {
    console.log(this);
    return x + y;
}
let result = fn.call(100, 10, 20);
console.log(result); 
*/


//============================
// 原理：闭包 “柯理化”
// Function.prototype.bind = function bind(context, ...params) {
//     // this->fn 最后要执行的函数
//     // context->obj 最后要改变的this
//     // params->[10,20] 最后要传递的参数
//     let that = this;
//     return function proxy(...args) {
//         params = params.concat(args);
//         return that.call(context, ...params);
//     };
// };

let obj = {
    name: '珠峰培训',
    age: 11
};

function fn(x, y, ev) {
    console.log(this);
}
Function.prototype.binds=function (obj,...params){
    // 当前的this.就是调用函数的函数
    // obj就是传入的this指向的
    let that=this
    //使用箭头函数不会有this指向的问题
    return (...argu)=>{
       let paramsd=[...params,...argu]
       //接收,传入的参数
      return  this.call(obj,paramsd)
        
    }
}
console.log(fn.binds(obj)())
// document.body.onclick = fn.bind(obj, 10, 20);
// document.body.onclick = function proxy(ev) {
//     fn.call(obj, 10, 20, ev);
// };