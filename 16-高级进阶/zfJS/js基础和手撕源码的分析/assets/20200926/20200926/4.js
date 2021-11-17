/*
 * 应用4:柯里化函数 「预处理的思想:预先存储，后续拿来直接使用」
 *    + 执行函数，形成一个闭包，把一些信息(私有变量和值)存储起来「保存作用」
 *    + 以后其下级上下文中如果需要用到这些值，直接基于作用域链查找机制，拿来直接用即可
 */

/* function fn() {
    // 存储执行fn传递的实参信息
    let outerArgs = Array.from(arguments);

    return function anonymous() {
        // 存储执行小函数传递的实参信息
        let innerArgs = Array.from(arguments);

        // 存储两次执行函数传递的实参信息
        let params = outerArgs.concat(innerArgs);
        return params.reduce(function (result, item) {
            return result + item;
        });
    };
} */

/* const fn = (...outerArgs) => {
    return (...innerArgs) => {
        return outerArgs.concat(innerArgs).reduce((result, item) => {
            return result + item;
        });
    };
}; */
function fb(...arguments){
	console.log(arguments.concat([7,8]))
}
fb(1,2,3,4,4)
// const fn = (...outerArgs) => (...innerArgs) => outerArgs.concat(innerArgs).reduce((result, item) => result + item);
// let res = fn(1, 2)(3);
// console.log(res); //=>6  1+2+3

// 数组中的reduce：依次遍历数组中的每一项，可以把上一轮遍历得到的结果，传递给下一轮，以此实现结果的累计
//   + arr.reduce([function])：会把数组第一项做为初始结果，从数组第二项开始遍历
//   + arr.reduce([function],[value])：第二个传递的参数作为初始结果，从数据第一项开始遍历
// let arr = [10, 20, 30, 40];
/* let result = arr.reduce(function (result, item, index) {
    // 第一轮遍历: result->10「数组中的第一项值」  item->20  index->1
    // 第二轮遍历: result->30「上一轮遍历，函数返回的结果」 item->30 index->2
    // 第三轮遍历: result->60 item->40 index->3
    console.log(result, item, index);
    return result + item;
}); */
/* let result = arr.reduce(function (result, item, index) {
    // 第一轮遍历: result->0  item->10 index->0
    // 第二轮遍历: result->10 item->20 index->1
    // ....
    console.log(result, item, index);
    return result + item;
}, 0);
console.log(result); //100 */

/* // 重构reduce
function reduce(arr, callback, initValue) {
    let result = initValue,
        i = 0;
    // 没有传递initValue初始值：把数组第一项作为初始值，遍历从数组第二项开始
    if (typeof result === "undefined") {
        result = arr[0];
        i = 1;
    }
    // 遍历数组中的每一项：每一次遍历都会把callback执行
    for (; i < arr.length; i++) {
        result = callback(result, arr[i], i);
    }
    return result;
}
let arr = [10, 20, 30, 40];
let result = reduce(arr, function (result, item, index) {
    return result + item;
});
console.log(result); //100 */


/* function fn(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}
let res = fn(10)(20)(30); */