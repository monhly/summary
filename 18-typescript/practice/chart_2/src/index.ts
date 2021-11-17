let nums: number
nums = 11
// 抽象类:不能被实例化
abstract class Ano {

}
//接口:用来定义一个类的结构(可重复定义)
interface myInter {
    name: string,
    age: number
}
const objs: myInter = {
    name: '21',
    age: 222
}
console.log(objs)

/**
 * 泛型:在定义函数或者是类的时候,如果遇到类型不明确就可以使用泛型()
 */
function fn<T>(a: T): T {
    return a
}
fn(12)