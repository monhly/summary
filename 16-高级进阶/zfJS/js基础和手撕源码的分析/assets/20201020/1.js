(function () {
    // 自定义一个Promise类，实现内置Promise的重写（PromiseAplus）
    // https://promisesaplus.com/
    function Promise(executor) {
        // 必须保证executor得是一个函数
        if (typeof executor !== "function") {
            throw new TypeError('Promise resolver ' + executor + ' is not a function');
        }

        // self:存储的是promise实例
        var self = this;
        self.PromiseState = "pending";
        self.PromiseResult = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        // 执行resolve/reject都是修改当前实例的状态和结果
        //   + 状态一但被更改后，则不能再次修改状态
        var run = function run(state, result) {
            if (self.PromiseState !== "pending") return;
            self.PromiseState = state;
            self.PromiseResult = result;
            // 执行resolve/rejec的时候，立即更改状态信息，但是不会立即通知方法执行（异步效果）
            setTimeout(function () {
                var arr = state === "fulfilled" ? self.onFulfilledCallbacks : self.onRejectedCallbacks;
                for (var i = 0; i < arr.length; i++) {
                    let itemFunc = arr[i];
                    if (typeof itemFunc === "function") {
                        itemFunc(self.PromiseResult);
                    }
                }
            });
        };
        var resolve = function resolve(value) {
            run("fulfilled", value);
        };
        var reject = function reject(reason) {
            run("rejected", reason);
        };

        // 立即执行executor函数:如果函数执行报错了，则promise状态也要改为失败态
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // Promise的原型
    Promise.prototype = {
        // 标记是否为自定义的PROMISE
        customize: true,
        constructor: Promise,
        then: function (onfulfilled, onrejected) {
            // 根据状态不同，执行不同的方法，处理不同的事情
            //   + 执行THEN的时候，哪怕此时已经知道状态了，也不是立即把onfulfilled/onrejected执行的，需要把函数的执行设置为异步操作：设置一个定时器，不设置等待的时间，则默认是浏览器最快的反应时间后执行，但是本身属于异步操作了
            //   + 执行THEN的时候，还不清楚实例的状态（例如：EXECUTOR函数中是一个异步操作的）：此时我们应该先把基于THEN传入的方法onfulfilled/onrejected存储起来(后期可以做去重处理)，在以后执行resolve/reject函数的时候，通知方法执行！
            var self = this;
            switch (self.PromiseState) {
                case "fulfilled":
                    setTimeout(function () {
                        onfulfilled(self.PromiseResult);
                    });
                    break;
                case "rejected":
                    setTimeout(function () {
                        onrejected(self.PromiseResult);
                    });
                    break;
                default:
                    self.onFulfilledCallbacks.push(onfulfilled);
                    self.onRejectedCallbacks.push(onrejected);
            }
        },
        catch: function () {}
    };

    window.Promise = Promise;
})();


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
        console.log(2);
    }, 1000);
});
p1.then(value => {
    console.log('成功', value);
}, reason => {
    console.log('失败', reason);
});
p1.then(value => {
    console.log('成功', value);
}, reason => {
    console.log('失败', reason);
});
p1.then(value => {
    console.log('成功', value);
}, reason => {
    console.log('失败', reason);
});
console.log(1);