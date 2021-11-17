/*
 * JS高阶编程技巧「本质：基于“闭包”的机制完成的」 
 *   闭包的特点：
 *     + 保护
 *     + 保存
 *     + 弊端:占用内存，消耗浏览器的性能（闭包可以用，但是不能滥用）
 * 
 * 应用2：基于“闭包”实现早期的“模块化”思想
 *   + 单例设计模式(模块化概念)
 *   + AMD -> require.js
 *   + CMD -> sea.js
 *   + CommonJS -> Node本身就是基于这种规范实现的
 *   + ES6Module
 *   + ...
 */

// 在没有对象类型值之前，我们很容易产生“全局变量的污染”
/* let name = '王杨波';
let age = 22;
let girlfriend = false;

let name = '张孟涛';
let age = 81;
let girlfriend = false; */

// 解决变量冲突:闭包机制 -> 保护
/* (function () {
    let name = '王杨波';
    let age = 22;
    let girlfriend = false;
    const skill = function () {};

    // 把私有的信息暴露到全局上，这样在其他的上下文中，就可以调用这些信息了；不能暴露太多，暴露多了，也会导致冲突；
    window.skill = skill;
})();

(function () {
    let name = '张孟涛';
    let age = 81;
    let girlfriend = false;

    skill();
})(); */

// 解决变量冲突:对象 -> 把描述当前事物特征的内容，全部汇总到一个对象中（存储到同一个堆内存中）
//   + 对象在这里起到一个“分组”的作用
//   + 新称呼：person1/person2 被称为命名空间；此处相当于，把描述同一个事物的属性，存放到相同的命名空间下，以此来进行分组，减少全局变量的污染；每一个对象都是Object这个类的一个实例，person1和person2是两个完全不同的实例，所以我们也可以把这种方式称之为“单例设计模式” -> 目的也是解决全局变量冲突和污染的；
/* let person1 = {
    name: '王杨波',
    age: 22,
    girlfriend: false,
    skill: function () {}
};

let person2 = {
    name: '张孟涛',
    age: 81,
    girlfriend: false,
}; */

// 高级单例设计模式：JS中最早期的模块化开发思想 “模块之间的独立性以及互通性”
//   + 把一个复杂或者大型的产品，按照功能特点拆分成一个个的模块
//   + 每个模块都是独立的，相互之间的信息互不干扰（有助于团队协作开发）
//   + 但是对于一些需要供其他模块用到的公共方法，我们是可以实现相互调用的

// 前端组长 -> 公共方法封装
let utils = (function () {
    let isWindow = true,
        num = 0;
    const queryElement = function queryElement(selector) {};
    const formatTime = function formatTime(time) {};

    // 把需要供外界调用的方法，存储到一个命名空间(对象)中
    return {
        // queryElement:queryElement
        queryElement,
        formatTime
    };
})();

// 程序猿A -> 搜索
let searchModal = (function () {
    let num = 10;
    const checkValue = function checkValue() {
        utils.formatTime();
    };
    const submit = function submit() {};

    return {
        checkValue
    };
})();

// 程序媛B -> 换肤
let skinModal = (function () {
    let num = 0;
    const submit = function submit() {
        searchModal.checkValue();
    };

    return {};
})();