let sub = (function () {
    let pond = {};
    const on = function on(event, func) {
        !pond.hasOwnProperty(event) ? pond[event] = [] : null;
        let arr = pond[event];
        !arr.includes(func) ? arr.push(func) : null;
    };
    const off = function off(event, func) {
        let arr = pond[event];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === func) {
                arr[i] = null;
                break;
            }
        }
    };
    const fire = function fire(event, ...params) {
        let arr = pond[event];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            let itemFunc = arr[i];
            if (typeof itemFunc !== "function") {
                arr.splice(i, 1);
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
    sub.off('BODY-CLICK', fn1);
    sub.off('BODY-CLICK', fn2);
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
    sub.fire('BODY-CLICK', 10, 20);
};

sub.on('BODY-CLICK', fn1);
sub.on('BODY-CLICK', fn2);
sub.on('BODY-CLICK', fn3);
sub.on('BODY-CLICK', fn4);
sub.on('BODY-CLICK', fn5);

//----
setTimeout(() => {
    sub.fire('AAA', 100, 200);
}, 1000);
sub.on('AAA', fn1);
sub.on('AAA', fn3);