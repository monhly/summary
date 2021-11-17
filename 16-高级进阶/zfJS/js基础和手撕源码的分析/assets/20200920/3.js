/* 
 * JS中声明变量
 *   传统：var function
 *   ES6：let const import（模块导入）
 */

// let VS const
//   + let声明一个变量，变量存储可以改值
//   + const声明的变量，一但赋值，则不能再和其他的值关联(不允许指针重新指向)
// let n = 12;
// n = 13;
// console.log(n); //13

// const m = 12;
// m = 13; //Uncaught TypeError: Assignment to constant variable.
// console.log(m);

// const obj = {
//     name: "珠峰培训"
// };
// obj.name = "周老师";
// console.log(obj);


/* 
 * 变量提升：在当前上下文，代码执行之前，会把所有带“var/function”关键字的进行提前的声明或者定义
 *   + 带“var”的只是提前声明
 *   + 带“function”的是声明+定义
 */
// let VS var
//   + var存在变量提升，而let不存在
//   + “全局上下文中”，基于var声明的变量，也相当于给GO(全局对象 window)新增一个属性，并且任何一个发生值的改变，另外一个也会跟着变化（映射机制）；但是基于let声明的变量，就是全局变量，和GO没有任何的关系；
//   + 在相同的上下文中，let不允许重复声明(不论你之前基于何种方式声明，只要声明过，则都不能基于let重复声明了)；而var很松散，重复声明也无所谓，反正浏览器也只按照声明一次处理；
//   + 暂时性死区「浏览器暂存的BUG」
//   + let/const/function会产生块级私有上下文，而var是不会的

/*
 * 上下文 & 作用域：
 *    + 全局上下文
 *    + 函数执行形成的“私有上下文”
 *    + 块级作用域（块级私有上下文）
 *      + 除了 对象/函数... 的大括号之外（例如：判断体、循环体、代码块...）都可能会产生块级上下文
 */

// n是全局上下文的：代码块不会对他有任何的限制
// m是代码块所代表的块级上下文中私有的
// debugger; //开启断点调试，代码运行中，遇到debugger暂停，我们在控制台基于 F10/F11 逐过程/逐语句 去控制代码执行，从而观察到每行代码执行的结果  =>BUG调试
/* {
    var n = 12;
    console.log(n); //12

    let m = 13;
    console.log(m); //13
}
console.log(n); //12
console.log(m); //Uncaught ReferenceError: m is not defined */


/* // i是全局的
for (var i = 0; i < 5; i++) {
    // console.log(i); //0~4
}
console.log(i); //5 */

/*
// i不是全局的，是块级上下文中私有的 
for (let i = 0; i < 5; i++) {
    console.log(i); //0~4
}
console.log(i); //Uncaught ReferenceError: i is not defined */

/* // i及循环中用到的i都是在全局下声明的全局变量(循环不会产生块级上下文)
let i = 0;
for (; i < 5; i++) {
    console.log(i); //0~4
}
console.log(i); //5 */

/* for (let i = 0; i < 5; i++) {
    console.log(i);
    i += 2;
} */

// 浏览器在每一轮循环的时候，帮助我们形成的“闭包”
/* 
let buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    // 父级“快级上下文”：控制循环
    //   第一轮循环  私有的块级上下文EC(B1)  i=0
    //   ->当前上下文中创建的一个小函数，被全局的按钮的CLICK占用了，EC(B1)不会被释放 “闭包”
    buttons[i].onclick = function () {
        console.log(`当前点击按钮的索引：${i}`);
    };
    // ...
} 
*/

/* 
// console.log(n); //Uncaught ReferenceError: n is not defined
// console.log(typeof n); //undefined 基于typeof检测一个为被声明的变量，不会报错，结果是undefined

// console.log(typeof n); //Uncaught ReferenceError: Cannot access 'n' before initialization
// let n = 12; 
*/

/* 
// 在代码之前，浏览器会自己处理很多事情：词法分析、变量提升
// “词法分析阶段”，如果发现有基于let/const并且重复声明变量操作，则直接报语法错误 Uncaught SyntaxError: Identifier 'n' has already been declared，整个代码都不会做任何的执行
console.log('OK');  //词法分析阶段就报错了，所以一行代码都没有执行
var n = 12;
var n = 13;
let n = 14; 
*/


/* 
// let n = 12;
// console.log(n); //12
// console.log(window.n); //undefined

// VO(G): var n=12;   <=>  GO(window): window.n=12;
// var n = 12;
// console.log(n); //12
// console.log(window.n); //12
// window.n = 13;
// console.log(n); //13

// n = 13; //window.n=13;  没有基于任何关键词声明的，则相当于给window设置一个属性
// console.log(n); //13  首先看是否为全局变量，如果不是，则再看是否为window的一个属性...
// console.log(m); //如果两者都不是，则报变量未被定义 Uncaught ReferenceError: m is not defined

// // window.i=xxx  项目中尽可能少使用不经声明的变量
// for (i = 0; i < 5; i++) {
//     console.log(i);
// }

// function fn() {
//     // 私有上下文
//     m = 13; //window.m=13 按照作用域链查找机制，当前变量找到全局都没有，而且如果是设置的操作，则相当于给window设置一个属性
//     console.log(m); //13
//     console.log(n); //如果是获取的操作，则直接报错 Uncaught ReferenceError: n is not defined
// }
// fn();
// console.log(m); //13 
*/


/*
 * EC(G)
 *   变量提升：var n; 
 */
// console.log(n); //undefined
// console.log(m); //Uncaught ReferenceError: Cannot access 'm' before initialization
// var n = 12;
// let m = 13;