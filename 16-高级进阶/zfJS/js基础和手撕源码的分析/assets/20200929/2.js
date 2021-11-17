/*
 * 自定义类(所有的类「内置类/自定义类」都是“函数数据类型”的值)
 *   + 函数执行的时候基于new执行即可 “构造函数执行”
 */
/* 
function Fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return total;
}
// 作为普通函数执行
// Fn(10, 20);

// 构造函数执行
//   + f1是Fn这个类的一个实例对象
let f1 = new Fn(10, 20);
console.log(f1.x, f1.y, f1.total); //10 20 undefined 「total只是上下文中的私有变量，和实例f1没有关系」 */

/* 
function Fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return {
        name: '珠峰'
    };
}
// 由于构造函数体中，默认自己返回一个引用类型值，所以f1不再是创建的Fn实例，而是自己返回的对象
let f1 = new Fn(10, 20);

// “实例 instanceof 构造函数” ：检测当前实例是否属于这个类
console.log(f1 instanceof Fn); //false 
*/

function Fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    this.say = function say() {
        console.log(`SAY:${total}`);
    };
}
let f1 = new Fn(10, 20);
let f2 = new Fn;

// console.log(f1 === f2); //false
// console.log(f1.say === f2.say); //false

// 检测一个属性是否为当前对象的成员
//    + 属性名 in 对象：不论是私有属性还是公有的属性，只要有就是true
//    + 对象.hasOwnProperty(属性名)：必须是对象的私有属性，结果才是true
// ？？？？？自己扩展一个方法 hasPubProperty(对象,属性名)：检测当前属性是否属于对象的公有属性（特点：必须有这个属性，而且不是私有的）
/* console.log('say' in f1); //true
console.log('toString' in f1); //true
console.log('total' in f1); //false
console.log(f1.hasOwnProperty('say')); //true
console.log(f1.hasOwnProperty('toString')); //false
console.log(f1.hasOwnProperty('total')); //false */

// Fn VS Fn():Fn代表的是函数本身（堆内存 -> ƒ Fn(x, y) {...}）,而Fn()是把函数执行，获取其返回值;
// new Fn VS new Fn():都是把Fn执行了,只是第一个没有传递实参,第二个可以传递实参而已
//    + new Fn;  运算优先级是18（无参数列表new）
//    + new Fn(); 运算符优先级是19（有参数列表new）

Object.prototype.AA = '珠峰';
let obj = {
    name: 'xxx',
    age: 11,
    0: 100,
    [Symbol('AA')]: 200,
    [Symbol.toPrimitive]: function () {
        return 0;
    }
};

// 基于“for...in”循环遍历对象
//   + 优先遍历数字属性
//   + 不会遍历到Symbol属性
//   + 会把自己扩展到“类原型”上的公共属性方法也遍历到「可枚举的」
/* for (let key in obj) {
    // 在遍历过程中，遍历到公共属性，则停止遍历：因为for...in遍历的本意就是只遍历私有的属性即可
    if (!obj.hasOwnProperty(key)) break;
    console.log(key);
} */

// Object.keys(obj):获取当前对象所有非Symbol的私有属性「数组」 =>Object.getOwnPropertyNames
// Object.getOwnPropertySymbols(obj):获取对象所有的Symbol私有属性「数组」
/* let keys = [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
];
keys.forEach(key => {
    console.log(`属性名:${String(key)}，属性值:${obj[key]}`);
}); */