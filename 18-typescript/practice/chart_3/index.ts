// ts函数的使用
/**
 * 函数的类型分为两个部分:
 * 参数类型和返回值类型
 * 
 * 为函数添加返回值的类型,有时候ts能够自动推断出函数返回值的数据类型,
 */
// (a:string)=>void 意思是一个带有一个参数的函数,named a,类型为string,类型为string,没有返回值



function add(x:number,y:number):number{
    return x+y
}
/**
 * 
 函数类型是由参数类型和返回值类型组成
 */
let myAdd:(x:number,y:number)=>number=function(x:number,y:number):number{return x+y}

/**
 * 赋值语句的一边制定了类型,另一边没有类型的话,ts会自动识别此类型
 */
let myAdd1:(x:number,y:number)=>number=function(x,y):number{return x+y}


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
 * 基于ts对函数进行语法重构
 * 注意:在进行重载的时候一定要吧最精确地定义放在最前面
 */
//  let suits:string[]=["hearts","spaders,","cludes"];
//  function pickCard(x:{suit:string,card:number}[]):number;
//  function pickCard(x:number):{suite:string;card:number}
//  function pickCard(x):any{
//     if (typeof x == "object") {
//         let pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }
//     // Otherwise just let them pick the card
//     else if (typeof x == "number") {
//         let pickedSuit = Math.floor(x / 13);
//         return { suit: suits[pickedSuit], card: x % 13 };
//     }
//  }

