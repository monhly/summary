/*
 * this函数的执行主体 
 *   + 函数执行主体：谁把函数执行的
 *   + 函数执行上下文：在哪执行的
 * 
 * 规律：
 *   1.事件绑定:给当前元素的某个事件行为绑定方法，当事件触发、方法执行，方法中的this是当前元素本身
 *   2.普通函数执行
 *     + 函数执行前面是否有“点”，没有“点”，this就是window（或者JS严格模式下是undefined）
 *     + 有“点”，“点”前面是谁this就是谁
 *     + 匿名函数(自执行函数/回调函数)如果没有经过特殊的处理，则this一般都是window/undefined，但是如果经过一些特殊处理，一切都以处理后的结果为主
 */

/* (function () {
    console.log(this); //this->window/undefined
})(); */

/* function fn(callback) {
    callback(); //this->window/undefined
}
let obj = {
    // sum:function(){}
    sum() {
        console.log(this);
    }
};
// obj.sum(); //this->obj
// 回调函数：把一个函数作为实参值，传递给另外一个函数
// => fn(function () {});
fn(obj.sum); */

/* setTimeout(function () {
    console.log(this); //window或者undefined
}, 1000); */

/* 
let obj = {
    name: 'xxx'
};
let arr = [10, 20];
arr.forEach(function (item, index) {
    console.log(this); //obj 因为触发回调函数执行的时候，forEach内部会把回调函数中的this改变为传递的第二个参数值obj “特殊处理”
}, obj);
*/

/* 
let obj = {
    sum() {
        console.log(this);
    }
};
obj.sum(); //this->obj
(obj.sum)(); //this->obj
// 括号表达式:小括号中包含“多项”(如果只有一项，和不加括号没啥本质区别)，其结果是只取最后一项；但是这样处理后，this会发生改变，变为window/undefined
(10, obj.sum)(); //this->window 
*/

//====================
/* 
// 开启JS严格模式  => 扩展：严格模式和非严格模式的区别
// "use strict";
function fn() {
    console.log(this);
}
let obj = {
    name: '珠峰培训',
    fn: fn
};
fn(); //this->window/undefined
obj.fn(); //this->obj 
*/

/* 
document.body.onclick = function () {
    console.log(this); //body
};
document.body.addEventListener('click', function () {
    console.log(this); //body
});
// IE6~8 DOM2事件绑定
document.body.attachEvent('onclick', function () {
    console.log(this); //window
}); 
*/


/* // 全局上下文中的this是window；块级上下文中没有自己的this，所用到的this都是所处上级上下文中的this;
console.log(this); //window
{
    let n = 12;
    console.log(this); //window  上级上下文是全局上下文
} */