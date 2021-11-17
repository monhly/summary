//一.泛型
/**
 * 需求: 定义一个创建数组的方法, 可以创建出指定长度的数组, 并且可以用任意指定的内容填充这个数组
 */
// function  getArray(value:any,items:number=5):any[]{
//     return  new Array(items).fill(value)
// }
// getArray("str",5)
// getArray(1,5)

//基于泛型进行改造
// function getArray <T>(value:T,items:number=2):T[]{
//     return new Array(items).fill(value)
// }
// let arr=getArray<string>("str")

// // let arr=getArray<number>(1,5)
// arr.map(item=>item.length)


//二.泛型约束
/**
 * 默认情况下,我们可以执行泛型为任意的类型
 * 但是有些情况下我们需要制定的类型满足某些条件后才能指定(此时就需要泛型约束)
 */
interface Lengths{
    length:number
}
let getAny=function <T extends Lengths>(value:T,items:number):T[] {
    return new Array(items).fill(value)
}
// getAny(10,10)
getAny("aaa",10)


//三.在泛型约束中使用类型参数?
//在一个泛型中被另一个泛型约束,就叫做泛型约束中使用类型参数
/**
 * 
 */
// interface propsObj{
//     [key:string]:any
// }


// let getProps=(obj:object,key:string):any=>{
//     return obj[key]
// }
// let objs={
//     name:'asd',
//     age:0
// }
// let ress=getProps(objs,"ages")
// console.log(ress);
//此时在获取属性的时候,如果当前获取的属性不存在在obj中,此时就会输出undefined,如何对类型进行限制?如果在获取obj的时候没有这个属性,就出现报错?

//升级版


//K extends keyof T    K是继承来自于T上的属性
let getProps=<T,K extends keyof T>(obj:T,key:K):any=>{
    return obj[key]
}
let objs={
    name:'asd',
    age:0
}
getProps(objs,"name")
getProps(objs,"age")
//此时ages并不是obj上的属性所以会出现报错
// getProps(objs,"ages")
