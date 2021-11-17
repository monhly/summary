/*
 * typeof的原理：
 *   + 所有的数据类型值在计算机中存储的都是按照“二进制”存储的
 *   + null -> 000000
 *   + 只要是对象都是以 000 开始的
 *   + typeof检测的时候，是按照计算机存储的二进制的值来检测的
 */

// console.log(new Symbol()); //Uncaught TypeError: Symbol is not a constructor
/* 
console.log(Symbol('AA') === Symbol('AA')); //false
let symb = Symbol('BB');
console.log(symb === symb); //true 

// + 给对象设置唯一的属性
// + 在vuex/redux中做行为派发的时候，统一管理派发的行为标识，标识的值可以是唯一值
// + .....
*/
/* Symbol.hasInstance
Symbol.toPrimitive
Symbol.toStringTag
Symbol.iterator
Symbol.isConcatSpreadable
Symbol.match
... */

// bigint 超大数字
