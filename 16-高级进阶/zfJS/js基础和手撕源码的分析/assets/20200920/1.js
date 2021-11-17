/* let x = 5;

function fn(x) {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x); */

/* 
// 扩展
let x = 5;
function fn() {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
*/

/* 
// i++和++i的区别(数学运算)：在自身的基础上累加1
//   i++ 先拿原始i的值进行运算，运算结束后，i再累加1
//   ++i 先让自身累加1，累加后拿最新的结果进行运算处理
let i = 1;
console.log(5 + (i++)); //6  5+i -> i++
i = 1;
console.log(5 + (++i)); //7  ++i -> 5+i 
*/

let a = 0,
    b = 0;
function A(a) {
    A = function (b) {
        alert(a + b++);
    };
    alert(a++);
}
A(1);
A(2);

