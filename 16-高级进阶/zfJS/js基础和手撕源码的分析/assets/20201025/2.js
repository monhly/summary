/*
 * 所有的设计模式都是用来有效管理代码的
 *   + 便捷开发
 *   + 通俗易懂
 *   + 有助于后期代码的维护和升级
 *   + ...
 * 
 * 发布订阅设计模式「观察者模式的升级版」
 *   + 发布一个计划，并且向计划中订阅一个个的方法
 *   + 当触发某个事件或者到达了某个阶段，我们可以通知计划中订阅的方法，按照顺序依次执行
 */

// 第一版：不支持自定义事件，且一个页面只有一个事件池 「单例设计模式」
let sub = (function () {
    // 创建自定义事件池
    let pond = [];

    // 订阅/移除订阅/通知执行
    const on = function on(func) {
        // 去重处理
        for (let i = 0; i < pond.length; i++) {
            if (pond[i] === func) {
                return;
            }
        }
        pond.push(func);
    };
    const off = function off(func) {
        for (let i = 0; i < pond.length; i++) {
            if (pond[i] === func) {
                // 会导致数组塌陷，带来一些无法控制的问题
                // pond.splice(i, 1);
                pond[i] = null;
                break;
            }
        }
    };
    const fire = function fire(...params) {
        for (let i = 0; i < pond.length; i++) {
            let itemFunc = pond[i];
            if (typeof itemFunc !== "function") {
                // 此时移除掉
                pond.splice(i, 1);
                i--;
                continue;
            }
            itemFunc(...params);
        }
    };

    return {
        on,
        off,
        fire
    };
})();



//============测试
const fn1 = (x, y) => {
    console.log('fn1', x, y);
};
const fn2 = () => {
    console.log('fn2');
    sub.off(fn1);
    sub.off(fn2);
};
const fn3 = () => {
    console.log('fn3');
};
const fn4 = () => {
    console.log('fn4');
};
const fn5 = (x, y) => {
    console.log('fn5', x, y);
};

document.body.onclick = function () {
    // 通知事件池中订阅的方法执行
    sub.fire(10, 20);
};

sub.on(fn1);
sub.on(fn2);
sub.on(fn3);
sub.on(fn4);
sub.on(fn5);