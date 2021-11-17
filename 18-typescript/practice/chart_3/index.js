// ts函数的使用
/**
 * 函数的类型分为两个部分:
 * 参数类型和返回值类型
 *
 * 为函数添加返回值的类型,有时候ts能够自动推断出函数返回值的数据类型,
 */
function add(x, y) {
    return x + y;
}
/**
 *
 函数类型是由参数类型和返回值类型组成
 */
var myAdd = function (x, y) { return x + y; };
/**
 * 赋值语句的一边制定了类型,另一边没有类型的话,ts会自动识别此类型
 */
var myAdd1 = function (x, y) { return x + y; };
/**
 * 可选参数和默认参数
 * 传递给一个函数的参数个数必须与期望函数的参数个数一致
 */
// function argumentsArg(x:number,y:number){
//     return x+y
// }
// argumentsArg(10)//此时会提示传入的参数个数不一样
//使用?可选参数
// function argumentsArg(x:number,y?:number){
//     return x+y
// }
// argumentsArg(10)
//默认参数
// function argumentsArg(x:number,y=10){
//     return x+y
// }
// console.log(argumentsArg(10));
// 注意:此场景下需要对传入的参数进行特殊的处理
// function argumentsArg(x=10,y:number){
//     return x+y
// }
// //传入undefined可以使用默认值
// console.log(argumentsArg(undefined,20));
// 剩余参数
/**
 * 使用arguments来访问所有的传入的参数
 */
// function buildName(fir,...sec:string[]){
//     return  fir+sec.join(" ")
// }
// console.log(buildName("Joseph", "Samuel", "Lucas", "MacKinzie"));
//函数的重载
// js函数的写法:
// let suits:string[]=["hearts","spaders,","cludes"];
// function pickCard(x):any{
//     if(typeof x=="object"){
//         let pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }else if(typeof x=="number"){
//         let pickedSuit = Math.floor(x / 13);
//         return { suit: suits[pickedSuit], card: x % 13 };
//     }
// }
// let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
// let pickedCard1 = myDeck[pickCard(myDeck)];
// let pickedCard2 = pickCard(15);
// console.log("111",pickedCard1,pickedCard2);
/**
 * 基于es6进行语法重构
 */
var suits = ["hearts", "spaders,", "cludes"];
function pickCard(x) {
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
pickCard("222");
