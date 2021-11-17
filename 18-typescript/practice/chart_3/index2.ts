//泛型的使用
/**
 * demo使用any创建一个泛型的例子
 * 
 */
// function identity(arg:any):any{
//     return arg
// }
// 危害:使用any类型会导致这个函数可以接受任何类型的arg参数
/**
 * 泛型:需要使用一种方法使返回值的类型与传入参数相同的类型是相同的,它是一种特殊的变量,只用于表示类型而不是值
 */
// function identity<T>(arg:T):T{
//     return arg
// }
//泛型的使用
//1.传入所有的参数,包含类型参数
// console.log(identity<string>("sadsa"));
///2.利用类型退到,编译器会根据传入的参数自动地帮助我们确定T的类型
// console.log(typeof identity(1));


//使用泛型变量
// 1.
// function logLength<T>(arg:T[]):T[]{
//     console.log(arg.length);
//     return arg
// }
// console.log(logLength([1]));
//2.
// function logLength<T>(arg:Array<T>):Array<T>{
//     console.log(arg.length);
//     return arg
// }



//泛型类型
// 泛型函数和非泛型函数的类型没有什么不同
// function identify<T>(arg:T):T{
//     return arg
// }
// let myIdentify:<T>(arg:T)=>T=identify

// //使用不同的泛型参数名
// let myIdentify1:<U>(arg:U)=>U=identify
// let myIdentity2: {<T>(arg: T): T}=identify
// console.log('myIdentity2',myIdentity2);
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
console.log(myIdentity);