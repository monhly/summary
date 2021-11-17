/*
 * 对象数据类型值
 *   + 普通对象/数组对象/正则对象/日期对象/DOM元素对象/类数组集合...
 *   + prototype原型对象(排除Function.prototype)
 *   + __proto__(排除Object.prototype.__proto__)
 *   + ...
 * 函数也是对象，函数有多种角色
 *   + 函数
 *     + 普通函数
 *     + 箭头函数
 *     + 生成器函数
 *     + 构造函数（类）
 *   + 普通对象
 */
/* function Fn() {
    this.x = 100;
    this.y = 200;
}
Fn.prototype.write = function () {};
Fn.prototype.read = function () {}; */

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};

function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();