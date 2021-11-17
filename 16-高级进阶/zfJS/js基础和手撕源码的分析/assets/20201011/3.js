/*
 * 创建一个值
 *   + 字面量
 *   + 构造函数 
 * 
 * 对于引用数据类型值来讲，除了语法上的一些细节点，没有本质的区别，都是创造出当前类的一个实例
 * 对于基本数据类型值来讲，区别很大：
 *   + 字面量方式创建出来的是 基本数据类型值「也是所属类的实例」
 *   + 构造函数方式创建出来的是 引用数据类型值 「肯定是所属类的实例」
 */
// let obj1 = {};
// let obj2 = new Object();

/* let num1 = 10;
let num2 = new Number(10);
console.log(num1.toFixed(2)); //=>'10.00' 底层处理:默认先把10转换为对象格式的,再去调用Number.prototype上的方法进行处理
console.log(num2.toFixed(2)); //=>'10.00' 直接基于__proto__查找调用即可

console.log(num1 + 20); //=>30 直接数学运算
console.log(num2 + 20); //=>30
// 底层处理: 对象->数字/字符串
//   + 首先调用 num2[Symbol.toPrimitive] 这个方法
//   + 没有上述的方法，再调用 num2.valueOf() 这个方法
//   + 如果还是没有，则调用 toString/Number ... */

const check = value => {
    value = +value;
    return isNaN(value) ? 0 : value;
};
Number.prototype.plus = function plus(value) {
    // this->n 「对象数据类型的值」
    value = check(value);
    return this + value;
};
Number.prototype.minus = function minus(value) {
    value = check(value);
    return this - value;
};

let n = 10;
let m = n.plus(10).minus(5);
console.log(m); //=>15（10+10-5）