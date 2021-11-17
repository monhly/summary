//二.源码解读vue中的$nextTick方法
// 参考链接 https://juejin.cn/post/6963542300073033764

/***
 * nexttick方法借鉴了浏览器中的event loop事件循环做到了异步的更新
 * 将碰到的异步任务推送到一个异步的队列当中,
 */

// 1.
/**
 *
 * @param {*} cb Function
 * @param {*} ctx Object
 * @returns
 */

let timerFunc;
// /创建一个执行栈
const callbacks = [];
//当前执行的状态
let pending = false;

export function nextTick(cb, ctx) {
  let _resolve;

  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
// this.$nextTick((vm)=>{}) //推送到callbacks执行栈中,进行后续等待的执行
//直接调用this.$nextTick()不传参数,此时会返回一个promise

// 2.
if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
}
//  当执行环境是 iPhone 等，使用 setTimeout 异步调用 noop ，iOS 中在一些异常的webview 中，promise 结束后任务队列并没有刷新所以强制执行 setTimeout 刷新任务队列。
else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
}
//对于非IE浏览器和是否可以使用HTML5新特征的MutationObserve进行判断,
//实例化MutationObserve对象,利用MutationObserve的特征进行异步的操作
else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
}
//判断immediate是否存在,setImmediate是高版本才会支持的,
else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

//如果以上所有的分支api都不支持的时候,就是用setTimeOut去执行函数

//综上所述,在timeFunc赋值的过程中,就是一个降级的过程,在vue执行的过程中,根据环境的不同,去适配环境

//   3.

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
//flushCallback循环执行callbacks栈中的数据,执行所有的callbacks
