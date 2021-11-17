//一.ts函数完整格式
/**
 * 在ts中函数的完整格式应该是由函数的定义和实现两个部分组成
 *
 */
//1.定义一个函数
// let addFunc1:(a:number,b:number)=>number
// // 2.实现一个函数
// addFunc1=function(x:number,y:number):number{
//     return x+y
// }
// //3.函数的完整写法
// let addFunc:(a:number,b:number)=>number=function(x:number,y:number):number{
//     return x+y
// }
//ts函数的声明
// type addFunc1=(a:number,b:number)=>number
//函数的重载
//函数的重载就是根据传入的参数不同实现不同的功能
// function getArray(x:number):number[]{
//     return [x]
// }
//二.ts的可选参数/默认参数和剩余参数
//1.可选参数
function addNum(x, y) {
    return x + y;
}
console.log(addNum(10, 20));
//2.剩余参数
function addNum2(x) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    var result = x;
    arg.forEach(function (item) {
        return result += item;
    });
    return result;
}
console.log(addNum2(10, 20, 30, 40, 50));
//3.默认参数
function addNum3(x, y) {
    if (y === void 0) { y = 40; }
    return x + y;
}
console.log(addNum3(10));
