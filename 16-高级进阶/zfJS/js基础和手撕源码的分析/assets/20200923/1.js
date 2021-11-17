/*
 * EC(G)
 *   变量提升：把当前上下文中所有带 var（提前声明） / function（提前声明+定义） 进行提前的声明或者定义
 *    「全局上下文中，基于var/function声明的变量，也相当于给window设置了对应的属性」
 *     var a;
 *     var b;
 *     var c;
 *     fn = 0x000; [[scope]]:EC(G)
 *   代码执行：
 */
console.log(a, b, c); //=>undefined * 3
var a = 12,
    b = 13,
    c = 14;
function fn(a) { //代码执行遇到创建函数的代码会直接的跳过：因为在变量提升阶段已经处理过了
    /*
     * EC(FN)私有上下文
     *   作用域链:<EC(FN),EC(G)> 
     *   形参赋值:a=10
     *   变量提升:--
     *   代码执行:
     */
    console.log(a, b, c); //=>10 13 14
    a = 100; //私有a=100
    c = 200; //全局c=200
    console.log(a, b, c); //=>100 13 200
    // 函数执行完成后：没有返回值(RETURN)、出栈释放
}
b = fn(10); //先把函数执行,执行的返回结果赋值给全局变量b  b=undefined
console.log(a, b, c); //=>12 undefined 200

/* 
// 变量提升阶段，我们的函数就已经声明+定义了，所以可以在创建函数的代码之前执行函数
fn();
function fn() {} 
*/

/* 
// 函数表达式:变量提升阶段，只会声明fn，没有赋值，所以fn必须在创建的代码之后执行（推荐）
var fn = function () {};
fn(); 
*/