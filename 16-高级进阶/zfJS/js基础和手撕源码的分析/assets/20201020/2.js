(function () {
    function Promise(executor) {
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
        var run = function run(state, result) {
            if (self.PromiseState !== "pending") return;
            self.PromiseState = state;
            self.PromiseResult = result;
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

        // 立即执行executor函数
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // 统一处理基于THEN返回新实例的成功和失败
    function resolvePromise(promise, x, resolve, reject) {
        // 如果onfulfilled/onrejected方法返回的值和创建的新实例是一个东西，则产生死循环，我们直接让其抱错
        if (x === promise) {
            throw new TypeError("Chaining cycle detected for promise #<Promise>");
        }
        if ((x !== null && typeof x === "object") || typeof x === "function") {
            try {
                var then = x.then;
                if (typeof then === "function") {
                    // 返回结果是一个新的Promise实例「不一定是你自己构建的Promise，还可能是别人构建的Promise」
                    then.call(x, function (y) {
                        resolve(y);
                    }, function (r) {
                        reject(r);
                    });
                } else {
                    resolve(x);
                }
            } catch (err) {
                reject(err);
            }
        } else {
            resolve(x);
        }
    }

    // Promise的原型
    Promise.prototype = {
        customize: true,
        constructor: Promise,
        then: function (onfulfilled, onrejected) {
            // 处理onfulfilled/onrejected不传递值的情况
            if (typeof onfulfilled !== "function") {
                onfulfilled = function onfulfilled(value) {
                    return value;
                };
            }
            if (typeof onrejected !== "function") {
                onrejected = function onrejected(reason) {
                    throw reason;
                };
            }

            // self:原始promise实例
            // promise:新返回的promise实例「resolve/reject执行控制它的成功和失败」
            //   + 但是到底执行resolve/reject哪个方法是由onfulfilled/onrejected方法执行是否报错，以及它的返回结果是否为新的promise实例来决定的
            var self = this;
            var promise = new Promise(function (resolve, reject) {
                switch (self.PromiseState) {
                    case "fulfilled":
                        setTimeout(function () {
                            try {
                                var x = onfulfilled(self.PromiseResult);
                                resolvePromise(promise, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    case "rejected":
                        setTimeout(function () {
                            try {
                                var x = onrejected(self.PromiseResult);
                                resolvePromise(promise, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    default:
                        // 这样写的目的：把onfulfilled、onrejected放在不同的容器中，后期知道状态改为啥后，通知某个容器中的方法执行，其实最后执行的就是存储进来的onfulfilled、onrejected
                        // self.onFulfilledCallbacks.push(onfulfilled);
                        // self.onRejectedCallbacks.push(onrejected);
                        // 现在处理方案：向容器中存储一些匿名函数，后期状态改变后，先把匿名函数执行（给匿名函数传递PromiseResult），我们在匿名函数中再把最后需要执行的onfulfilled、onrejected执行，这样达到了相同的结果，但是我们可以监听onfulfilled、onrejected执行是否报错和他们的返回值了
                        self.onFulfilledCallbacks.push(function (PromiseResult) {
                            try {
                                var x = onfulfilled(PromiseResult);
                                resolvePromise(promise, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        self.onRejectedCallbacks.push(function (PromiseResult) {
                            try {
                                var x = onrejected(PromiseResult);
                                resolvePromise(promise, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                }
            });
            return promise;
        },
        catch: function (onrejected) {
            // 相当于 .then(null,onrejected)
            var self = this;
            return self.then(null, onrejected);
        }
    };

    // Promise对象
    Promise.resolve = function resolve(value) {
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    Promise.reject = function reject(reason) {
        return new Promise(function (_, reject) {
            reject(reason);
        });
    };
    Promise.all = function all(arr) {
        return new Promise(function (resolve, reject) {
            var index = 0,
                results = [];
            for (var i = 0; i < arr.length; i++) {
                (function (i) {
                    var item = arr[i];
                    if (!(item instanceof Promise)) {
                        //应该按照是否为函数或者对象，以及是否有then，then是否为一个函数来判断是否为Promie实例
                        index++;
                        results[i] = item;
                        continue;
                    };
                    item.then(function (result) {
                        index++;
                        results[i] = result;
                        if (index === arr.length) {
                            resolve(results);
                        }
                    }).catch(function (reason) {
                        // 只要有一个失败，整体就是失败
                        reject(reason);
                    });
                })(i);
            }
        });
    };

    window.Promise = Promise;
})();

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});
// 顺延：穿透
let p2 = p1.then(null /* value=>value */ , null /* reason=>throw reason */ );

let p3 = p2.then(value => {
    console.log('成功', value);
    return Promise.reject(100);
}, reason => {
    console.log('失败', reason);
    return 0;
});

p3.then(value => {
    console.log('成功', value);
}, reason => {
    console.log('失败', reason);
});

console.log(1);