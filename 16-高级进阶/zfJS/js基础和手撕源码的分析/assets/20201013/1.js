/* Function.prototype.call = function call(context, ...params) {
    ...
    let key = Symbol('KEY'),
        result;
    context[key] = this;
    result = context[key](...params);
    delete context[key];
    return result;
}; */

var name = '珠峰培训';

function A(x, y) {
    var res = x + y;
    console.log(res, this.name);
}

function B(x, y) {
    var res = x - y;
    console.log(res, this.name);
}
B.call(A, 40, 30);
B.call.call.call(A, 20, 10);
Function.prototype.call(A, 60, 50);
Function.prototype.call.call.call(A, 80, 70);


//====================

// 重点：var声明的变量（全局下声明，也相当于给window增加一个对应的属性）; ==在比较的时候，左右两边类型如果不一样，需要转换为相同的数据类型，然后再进行比较（因为当前都是和数字比，所以每一次都要把a转换为数字类型，才可以继续比较）；

// 解决方案1：利用对象转换为数字，浏览器默认做了一些处理，我们重写处理的方法，实现我们的效果即可
// 引用数据类型转换为数字
// 1. Symbol.toPrimitive
// 2. valueOf
// 3. toString
/* var a = {
    i: 0,
    [Symbol.toPrimitive]() {
        return ++this.i;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
}
// a==1 -> a[Symbol.toPrimitive]() */

/* let a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

/* // 解决方案2:基于Object.defineProperty在获取数据的时候，进行劫持
var i = 0;
Object.defineProperty(window, 'a', {
    // 获取window.a触发get函数执行，函数返回值就是获取的结果 (Vue2.0的响应式数据原理)
    get() {
        return ++i;
    }
});
// console.log(a); //->获取a的值，浏览器首先看是否为全局变量，如果不是，再去看是否为window的一个属性，如果也不是报错（未被定义）
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

//====================

/* Array.prototype.push = function push(value) {
    // this->arr
    // value->30
    this[this.length] = value; //这样操作完，length浏览器内部会自动增加
    //this.length++; 我们此时只是证明它会有一个length++的过程
}; */

/* let obj = {
    2: 3, //1
    3: 4, //2
    length: 2, //3 4
    push: Array.prototype.push
};
obj.push(1);
//也是把原型上的push方法执行  this->obj  value->1
//  obj[2] = 1;
//  obj.length++; 
obj.push(2);
//也是把原型上的push方法执行  this->obj  value->2
//  obj[3] = 2;
//  obj.length++;
console.log(obj); */

/* 
// 延展出一个小知识点：类数组想用数组中的方法  “鸭子类型”
//   + arguments HTMLCollection NodeList ...
let obj = {
    0: 10,
    1: 20,
    length: 2
};
// obj.forEach(item => {
//     console.log(item);
// }); //Uncaught TypeError: obj.forEach is not a function 因为obj不是Array的实例，所以无法直接调用数组原型上的方法

// // 解决办法1:改变THIS，实现方法的借用（OBJ的结构和数组结构一样，这样操作数组的代码才能操作obj）
// Array.prototype.forEach.call(obj, item => {
//     console.log(item);
// });

// // 解决办法2:改变原型指向
// obj.__proto__ = Array.prototype;
// obj.forEach(item => console.log(item));

// // 解决办法3:把需要用到的方法作为obj的一个私有属性，这样也可以直接的调用
// obj.each = Array.prototype.forEach;
// obj.each(item => console.log(item)); 
*/