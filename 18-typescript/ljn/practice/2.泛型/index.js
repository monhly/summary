//一.泛型
/**
 * 需求: 定义一个创建数组的方法, 可以创建出指定长度的数组, 并且可以用任意指定的内容填充这个数组
 */
// function  getArray(value:any,items:number=5):any[]{
//     return  new Array(items).fill(value)
// }
// getArray("str",5)
// getArray(1,5)
var getAny = function (value, items) {
    return new Array(items).fill(value);
};
// getAny(10,10)
getAny("aaa", 10);
var getProps = function (obj, key) {
    return obj[key];
};
var objs = {
    name: 'asd',
    age: 0
};
var ress = getProps(objs, "ages");
console.log(ress);
