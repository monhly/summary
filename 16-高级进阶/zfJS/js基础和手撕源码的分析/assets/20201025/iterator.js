/*
 * 遍历器（Iterator）是一种机制(接口)：为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署Iterator接口，就可以完成遍历操作，依次处理该数据结构的所有成员
 *   + 拥有next方法用于依次遍历数据结构的成员
 *   + 每一次遍历返回的结果是一个对象 {done:false,value:xxx}
 *     + done:记录是否遍历完成
 *     + value:当前遍历的结果
 * 
 * 拥有Symbol.iterator属性的数据结构(值)，被称为可被遍历的，可以基于for of循环处理
 *   + 数组
 *   + 部分类数组：arguments/NodeList/HTMLCollection...
 *   + String
 *   + Set
 *   + Map
 *   + generator object
 *   + ...
 * 
 * 对象默认不具备Symbol.iterator，属于不可被遍历的数据结构
 */

/*
class Iterator {
    constructor(arr) {
        this.arr = arr;
        this.index = 0;
    }
    next() {
        let index = this.index,
            arr = this.arr;
        if (index > arr.length - 1) {
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: arr[this.index++]
        };
    }
}
let arr = [10, 20, 30];
let itor = new Iterator(arr);
console.log(itor.next()); //->{done:false,value:10}
console.log(itor.next()); //->{done:false,value:20}
console.log(itor.next()); //->{done:false,value:30}
console.log(itor.next()); //->{done:true,value:undefined}
*/

/*
let arr = [10, 20, 30];
arr[Symbol.iterator] = function () {
    // 必须返回一个符合Iterator规范的对象:具备next方法
    let index = 0,
        self = this;
    return {
        next() {
            console.log('OK');
            if (index > self.length - 1) {
                return {
                    done: true,
                    value: undefined
                };
            }
            let result = {
                done: false,
                value: self[index++]
            };
            return result;
        }
    };
};
for (let item of arr) {
    console.log(item);
}
// console.log(...arr); 展开运算符处理机制也是先验证是否存在Symbol.iterator遍历器结构，如果存在，则按照这个结构处理...
*/


// 对象本身不是符合Iterator遍历规范的数据结构：我们可以手动设置Symbol.iterator让其具备这个能力
/*
let obj = {
    0: 10,
    1: 20,
    2: 30,
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
    // [Symbol.iterator]: function () {
    //     let index = 0,
    //         self = this;
    //     return {
    //         next() {
    //             return index > self.length - 1 ? {
    //                 done: true,
    //                 value: undefined
    //             } : {
    //                 done: false,
    //                 value: self[index++]
    //             };
    //         }
    //     };
    // }
};
for (let item of obj) {
    console.log(item);
}
*/

Object.prototype[Symbol.iterator] = function () {
    let self = this,
        keys = [
            ...Object.getOwnPropertyNames(self),
            ...Object.getOwnPropertySymbols(self)
        ],
        index = 0;
    return {
        next() {
            return index > keys.length - 1 ? {
                done: true,
                value: undefined
            } : {
                done: false,
                value: self[keys[index++]]
            };
        }
    };
};
let obj = {
    name: 'zhufeng',
    age: 11,
    [Symbol('AA')]: 100
};
for (let item of obj) {
    console.log(item);
}