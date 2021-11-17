/* 
function fun() {
    // 实例的私有属性和方法
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}
// 实例公有的属性和方法
fun.prototype = {
    b: function () {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a)
    }
}
var my_fun = new fun();
my_fun.b();
// 执行的是私有的方法b
// this->my_fun
// alert(my_fun.a) =>"0"
my_fun.c();
// 执行的是公有的方法c
// this->my_fun
// my_fun.a = 30 把实例对象私有属性a赋值为30
// alert(my_fun.a) =>"30"
*/

/*
function C1(name) {
    // name->undefined
    // 不会给实例设置name私有属性
    if (name) {
        this.name = name;
    }
}

function C2(name) {
    // name->undefined
    // 给实例设置私有属性name，属性值是undefined
    this.name = name;
}

function C3(name) {
    // name->undefined
    // 给实例设置私有属性name，属性值是'join'
    this.name = name || 'join';
}

C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
//=> "Tomundefinedjoin"
*/

/* function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function () {
    this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;​
Fn.prototype.b = function () {
    this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn); */


//===============原型重定向
// 1.内置类的原型是无法重定向的
// 2.在大量向原型上扩充方法的时候，重定向的操作一方面可以简化代码的编写，一方面也可以把所有扩充的公共属性和方法统一管理起来
// 弊端：重定向原型后，之前原型对象上存在的公共的属性和方法也都没有了（包含constructor）
//  + 如果之前原型上没有手动扩充任何属性方法，则重定向的原型对象手动设置一个constructor即可
//  + 如果之前原型上还存在其他的属性方法，则在重定向之前最好做“新老”原型对象的合并处理
/* 
function Fn() {
    this.x = 100;
    this.y = 200;
}
// Fn.prototype = {
//     constructor: Fn,
//     ...
// };
Fn.prototype.write = function () {};
Fn.prototype.read = function () {};
Fn.prototype = Object.assign(Fn.prototype, {
    say() {},
    eat() {},
    song() {},
    jump() {}
});
let f1 = new Fn;
console.log(f1); 
*/