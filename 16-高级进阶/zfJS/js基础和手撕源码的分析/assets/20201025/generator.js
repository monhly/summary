/*
 * 生成器对象是由一个generator function返回的,并且它符合可迭代协议和迭代器协议
 *   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
 */
/* function* func() {
    console.log('A');
    yield 1;
    console.log('B');
    yield 2;
    console.log('C');
    yield 3;
    console.log('D');
    return 4;
}
let iterator = func();
console.log(iterator.next()); //->{done:false,value:1}
console.log(iterator.next()); //->{done:false,value:2}
console.log(iterator.next()); //->{done:false,value:3}
console.log(iterator.next()); //->{done:true,value:4} */

/* function* func() {
    let x = yield 1;
    console.log(x); //->10
}
let iterator = func();
iterator.next();
iterator.next(10); */

/* function* func1() {
    yield 1;
    yield 2;
}

function* func2() {
    yield 3;
    yield* func1();
    yield 4;
}
let iterator = func2();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); */

/* function* func() {
    console.log(this); //->window
    this.NO = 'NO';
    yield 1;
    yield 2;
    yield 3;
}
func.prototype.OK = 'OK';
let iterator = func();
iterator.next();
console.log(iterator.OK); //->'OK'
console.log(iterator.NO); //->undefined */

/*
// 返回值是当前func的一个实例
// iterator.__proto__===func.prototype
// console.log(iterator instanceof func); //->true  
// new func(); // 但是func本身是无法new执行 Uncaught TypeError: func is not a constructo

// 也是GeneratorFunction的一个实例
//   + next:依次遍历对应的值
//   + return:结束遍历并且返回return指定的值
//   + throw

// 它拥有Symbol(Symbol.iterator)这个属性值:说明我们获取的结果是具备Iterator规范的
*/

const func = x => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(++x);
        }, 1000);
    });
};

/* // 异步串行
func(0).then(x => {
    console.log(x); //->1
    return func(x);
}).then(x => {
    console.log(x); //->2
    return func(x);
}).then(x => {
    console.log(x); //->3
}); */

/* (async function anonymous() {
    let x = await func(0);
    console.log(x);

    x = await func(x);
    console.log(x);

    x = await func(x);
    console.log(x);
})(); */

/*
function* generator(x) {
    x = yield func(x);
    console.log(x); //->1

    x = yield func(x);
    console.log(x); //->2

    x = yield func(x);
    console.log(x); //->3
}
let iterator = generator(0);
let result = iterator.next();
result.value.then(x => {
    result = iterator.next(x);
    result.value.then(x => {
        result = iterator.next(x);
        result.value.then(x => {
            iterator.next(x);
        });
    });
}); */

// generator:生成器函数
// params:初始执行generator传递的实参信息
/* function AsyncFunc(generator, ...params) {
    const iterator = generator(...params);
    const next = x => {
        let {
            value,
            done
        } = iterator.next(x);
        if (done) return;
        value.then(x => next(x));
    };
    next();
}
AsyncFunc(function* (x) {
    x = yield func(x);
    console.log(x); //->1

    x = yield func(x);
    console.log(x); //->2

    x = yield func(x);
    console.log(x); //->3
}, 0); */