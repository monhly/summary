// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence JS运算符优先级


/* var x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
}
fn(x);
console.log(x); */


function fn() {
    var x = 100;
    return function () {
        console.log('珠峰培训');
    }
}
var f = fn();
f();