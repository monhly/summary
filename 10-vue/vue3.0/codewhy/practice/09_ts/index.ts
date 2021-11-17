//ts的编译环境,ts最终会被编译成js来运行,所以需要搭建对应的环境;


//ts中变量的声明\
/**
 * 默认进行赋值的时候,会将赋值的值作为前面标识符的类型;
 *
 */
// string 字符串类型
// let str = 'sadas'
// str = 1111;


//number类型
// let num = 2213;//十进制
// num = 0b110 //二进制
// num = 0o555 //八进制
// num = 0xf23 //十进制

// console.log(num)


// // boolean  布尔类型
// let boo: boolean = true;


// //array;
// //1.定义字符串的数组
// const arr: Array<string> = []
// // arr.push(111)
// //2.定义number的数组
// const num: number[] = []
// num.push(11)
// console.log(num)



///object的定义:
// let info = {
//     name: '萨达',
//     age:11
// }

// // null和undefined 类型
// let nu = null;
// let und: undefined = undefined;


// //symbol类型

// let title = Symbol('titile')
// const obbj = {
//     [title]:'哈哈'
// }


//any类型
/**
 * 当我们无法确定一个变量的类型的时候,这个时候可以使用any类型
 *
 * 我们可以给any类型的变量进行任何的操作,包括获取不存在的属性/方法
 * 我们可以给any类型的变量渎职任何的值,比如数字/字符串的值
 */
// let an: any = '萨达 ';
// const arr: any[] = [1, 2, 'dsa']




//unknown类型
/**
 *用于描述类型不确认的值
 */
// let res: unknown
// let res1: any;
// res='231'

// //unknown类型不能赋值给其他的类型,只能赋值给any和unknown类型
// let steee: string = res

// //any类型可以赋值给其他的类型
// let sett:string=res1



//void类型
/**
 * 指定一个函数是没有返回值的,那么它的返回值就是void类型;
 *
 */
// function sum(num:number,num1:number) {
//     console.log(num, num1
//     )
// }
// sum(1, 2)


//  never类型;
/**
 * 一个函数从不返回值,
 * never类型表示从未观察到的值,在返回类型中,这意味着函数抛出异常,或者终止程序的执行;
 *
 */

// function fail(msg: string): never{
//     throw new Error(msg)
// }


//tuple类型
/**
 * 元组类型,
 *
 */


// let str: [string, number] = ['why', 11];

//函数的参数类型
// function sum(num:number,num1:number) {
//         console.log(num, num1
//         )
// }
// sum(1, 2)


// 元祖和数组的区别

// 首先,数组中通常建议存放相同类型的元素,不同类型的元素是不推荐放在数组中的(可以放在对象或者是元祖中)

//其次就是元组中的每个元素都有自己特征的类型,根据索引值获取到的值,可以确定对应的类型
// const newArr: [string, number] = ['111', 111]
// const arr: string[] = ['111', 111]
// const newArrs:Array<string>=['sadas',111]




//函数的参数和返回值的类型


// 函数的返回值的类型
/**
 * 和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的
    返回类型：
    p某些第三方库处于方便理解，会明确指定返回类型，但是这个看个人喜好
 */
// function sum(num:number,num1:number):number {
//    return num+num1
// }


//匿名函数的参数类型
// const newArr = ['11', '11']
// newArr.forEach((
//    item /**此时可以推倒出来当前参数的类型 */
// ) => {
//    console.log(item)
// })


//对象参数类型 设置?是可选参数
// function prints(point:{name:number,age?:string}){}




//联合类型
/**
 * 联合类型是由两个或者是多个其他类型组成的类型
 * 表示可以是这些类型中的任何一个值
 * 联合类型中的每一个类型被称之为联合成员
 *
 */
// function printId(id: number | string) {
//    console.log('获取的id是',id)
// }


//类型别名
// type newAre = string | number | boolean
// function add(point:newAre){

// }
// 类型断言 as
/**
 * ts无法获取到具体的值的时候,此时我们需要使用类型断言
 */

//此时我们可以使用断言进行获取元素的确认

// const myel = document.getElementById('img') as HTMLImageElement
// myel.src=''

//非空类型断言

//此代码在编译阶段会出现错误,因为传入的message肯恩格式undefined,这个时候方法是不能执行的此时我们可以使用非空类型的断言,!
// function printMessage(message?: string) {
//    console.log(message!.toLowerCase())
// }
// printMessage('sadsa')

//可选链的使用,es11中增加的特征;
// info?.name


//类型缩小
// typeof
// ===
// instanceof
// in
// 等等



//函数的类型解析
// const names: (() => void )= () => {
//    console.log('哈哈')
// }

//函数的剩余参数
// function foo(...nums: number[]) {
//    console.log(...nums)
// }
// foo(1,2,3,4,5,56)



// 函数的重载

// function add(a1: string | number, a2: number | string) {
//    return a1 + a2

// }
//此时当我们这样处理的时候会出现错误:运算符“+”不能应用于类型“string | number”和“string | number”。
//因此我们需要对函数进行重载
// function add(a1: number, a2: number):number
// ;
// function add(a1: string, a2: string):string;
// function add(a1: any, a2:any
// ):any {
//    return a1 + a2

// }
// console.log(add(10,20))

// 基于函数的联合类型实现
// function getLength(leng: string | any[]){
//       return leng.length
// }
   //在开发中,尽可能的选择使用联合类型来实现


// 类的静态成员
// class Student{
//    static time: string = '20'
//    static attend() {
//       console.log('去上了')
//    }
// }
// console.log(Student.time)
// console.log(Student.attend())


// 抽象类 abstract


//接口的声明
// type
// interface类型
// type infos = {
//    name: string,
//    age: number
// }
// interface info{
//    name: String,
//    age: Number,
//    //可选属性
//    obj?: {
//       firend:'sadsa'
//    },
//    //只读属性
//    readonly body: 'sadsa',
//    //索引类型
//    indexobj: {
//       [index:number]:string
//    },
//    //函数类型
//    (num:number):number

// }



// 枚举类型
/*
枚举类型其实就是将一组可能出现的值,一个个列出来,定义在一个类型中,这个类型就是枚举类型
枚举允许开发者定义一组命名常量,常量可以是数组或者是字符串
*/
// enum Direction{
//    LEFT,
//    RIGHT,
//    TOP,
//    BOTTOM
// }



//泛型
/**
 *
 *参数类型的参数化

 可以使用两种方式进行调用:
 方式一:通过<类型>的方式将类型传递给函数
 方式二:通过类型推倒,自动推倒到我们传入的变量类型
 *
 */
// function foo<Type>(arg: Type):Type {
//       return arg
// }
// foo<string>('222')
// foo(111)

//多个参数类型的传入
function foo<T,O,E>(arg: T,arg2:O,arg3:E) {
   return arg
}
foo(123,'sadsa',true)