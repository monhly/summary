/* 
/!*
 * EC(G)
 *   变量提升:
 *     var a;
 *     var b;
 *     var c;
 *     test = 0x000; [[scope]]:EC(G)
 *!/
var a = 10,
    b = 11,
    c = 12;

function test(a) {
    /!*
     * EC(TEST)
     *   作用域链:<EC(TEST),EC(G)> 
     *   形参赋值:a=10
     *   变量提升:
     *     var b;
     *!/
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a, b, c); //10 11 3 
*/

/*
/!*
 * EC(G)
 *   变量提升:
 *     var a;
 *     b = 0x000; [[scope]]:EC(G)
 *!/
var a = 4;
function b(x, y, a) {
    /!*
     * EC(B)
     *   作用域链:<EC(B),EC(G)> 
     *   初始化arguments(实参集合「类数组」): 
     *      {
     *        0:1,
     *        1:2,
     *        2:3, //->10  此时a的值也会跟着改为10
     *        length:3,
     *        callee:function b(){...}
     *      }  
     *      =>在JS的非严格模式下,当“初始化arguments”和“形参赋值”完成后，会给两者建立一个“映射”的机制:集合中的每一项和对应的形参变量绑定在一起了，一个修改都会跟着更改！而且只会发生在“代码执行之前”建立这个机制！
     *      =>在JS的严格模式下，没有映射机制，也没有arguments.callee这个属性；箭头函数中没有arguments；
     *   形参赋值:x=1 y=2 a=3
     *   变量提升:--
     *!/
    console.log(a); //=>3
    arguments[2] = 10;
    console.log(a); //=>10
}
a = b(1, 2, 3); //a=undefined 因为函数执行没有返回任何的值“return”
console.log(a); //=>undefined
*/

/* function fn(x, y, z) {
    // 初始arguments: [10,20]   ->它是类数组，我现在只是写成这种方便看的格式了
    // 形参赋值: x=10 y=20 z=undefined
    // ->z没有和arguments中任何一项产生映射机制
    x = 100;
    console.log(arguments[0]); //100

    arguments[1] = 200;
    console.log(y); //200

    z = 300;
    console.log(arguments[2]); //undefined
}
fn(10, 20); */

/* 
function fn() {
    // 存储的是当前函数本身:很多时候这样操作方便递归调用
    console.log(arguments.callee);
}
fn(); 


let obj = {
    name: '珠峰培训',
    fn: function (n) {
        n++;
        if (n > 12) return;
        console.log(n, this);
        // obj.fn(n); //this->obj
        // arguments.callee(n); //this->arguments  例如：arguments[1]() ->this:arguments
    }
};
obj.fn(10);

// JS严格模式下，不支持arguments.callee，此时我们该如何让匿名函数实现递归呢？
(function (i) {
    if (i >= 3) return;
    console.log(i);
    arguments.callee(++i);
})(1);
*/

// 匿名函数具名化:这是一个非常规范的操作，就是给匿名函数设置一个名字
//   + 此时这个名字可以在当前函数形成的私有上下文中使用，代表当前函数本身
//   + 此名字不能在外部上下文中使用
//   + 在本函数的上下文中使用，它的值是不允许修改的
//   + 如果当前的名字被上下文中的其他变量声明过，则名字是私有变量，和具名化的函数没有任何的关系了
/* 
"use strict";
(function b(i) {
    if (i >= 3) return;
    console.log(i);
    b(++i);
})(1);
// console.log(b); //Uncaught ReferenceError: b is not defined 
*/

/* 
(function b() {
    console.log(b); //-> ƒ b() {...}
    b = 100;
    console.log(b); //-> ƒ b() {...}
})(); 
*/

/* 
(function b() {
    console.log(b); //-> undefined
    var b = 100;
    console.log(b); //-> 100
})(); 
*/

/* Array.prototype.unique = function unique() {};
console.log(unique); //Uncaught ReferenceError: unique is not defined */

var b = 10;
(function b() {
    // 因为匿名函数具名化之后，此时上下文中的b都是匿名函数本身(且修改值无效)
    b = 20;
    console.log(b); //-> ƒ b() {...}
})();
console.log(b); //-> 10