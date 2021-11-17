/*
 * JS高阶编程技巧「本质：基于“闭包”的机制完成的」 
 *   闭包的特点：
 *     + 保护
 *     + 保存
 *     + 弊端:占用内存，消耗浏览器的性能（闭包可以用，但是不能滥用）
 * 
 * 应用5：compose组合函数
 */
const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;

// funcs:按照管道的顺序依次存储着要处理的函数
/* 
const compose = (...funcs) => {
    return x => {
        let len = funcs.length;
        if (len === 0) return x;
        if (len === 1) return funcs[0](x);
        return funcs.reduceRight((result, item) => {
            return item(result);
        }, x);
    };
}; 
*/

const compose = (...funcs) => {
    let len = funcs.length;
    if (len === 0) return x => x;
    if (len === 1) return funcs[0];
    return funcs.reduce((a, b) => {
        return x => {
            return a(b(x));
        };
    });
};
// [div2, mul3, add1, add1]
//第一轮遍历 a=div2 b=mul3 
//   x=>a(b(x))  0x000
//第二轮遍历 a=0x000 b=add1
//   x=>a(b(x))  0x001
//第三轮遍历 a=0x001 b=add1
//   x=>a(b(x))  0x002
//--->最后返回的就是 0x002，把其赋值给 operate
// 0x002(0)  -> 0x001(add1(0)) 
// 0x001(1)  -> 0x000(add1(1))
// 0x000(2)  -> div2(mul3(2)) =>3

const operate = compose(div2, mul3, add1, add1);
console.log(operate(0)); //3
console.log(operate(2)); //6
console.log(compose()(10)); //10
console.log(compose(div2)(10)); //5


/* 
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/