//手动分析
// vue2.0源码的分析
// vue构造函数定义=====> initMixin(初始化方法)=====>用_init初始化方法挂载到Vue原型之上吗,传入options调用========>initState
// vue2.0执行过程
// 1.执行Vue.initMixin()方法,为Vue绑定一个_init的方法,
/**
 * 2.调用_init方法,获取到传入的options参数,对获取的options参数进行合并的处理,merge,并添加不同的属性
 *  在init方法中还会初始化声明周期,初始化初始化state状态
 *
 * 3.initState中主要是对 props, methods, data,computed watch的初始化(initData)
 *
 * 4.initData中主要是对data进行一个proxy的代理,proxy的代理主要是能够实现两种方式的调  用一种是通过this.xxx的方式,还有一种方式使用过this._data.xxx的方式来进行实现;
 * 另外就是通过observe进行对data的监听
 *
 * 5.observe首先是获取data属性的__ob__属性,该属性主要是Observer的实例,只有Object和Array才具有该属性;ob=new Observe(value)
 *
 * 6.执行new Observe(value)执行该实例方法,首先会为value添加__ob__属性,值就是自己的实例,调用响应的方法,
 *
 * 7.在Observer这个构造函数中创建一个Dep的事件池,判断传入的属性是对象还是数组,如果是数组会遍历每一个数组,observe每一个属性;如果是对对象,就会遍历这个属性,设置defineReactive
 *
 * 8.在defineReactive阶段中,会这是getter和setter,当getter被触发的时候,收集依赖到dep中,并且闭包引用dep,对于引用数据类型,使用childOb.dep在保存一份依赖;递归调用childOb,
 *
 *
 *
 *
 *
 */

// 口述版2 关于vue的源码分析:
/**
 *Vue是采用数据劫持结合发布者-订阅者模式的方式,通过Object.defineProperty来劫持各个属性的setter,getter,在数据变化是发布消息给订阅者,触发响应的监听回调
  
 *具体步骤:
 *第一步:需要observer的数据对象进行递归遍历,包括子属性对象的属性,都加上setter和getter这样的话,给这个对象的某个值赋值,就会触发setter,那么就能监听到数据变化了
 *
 * 第二步:compile解析模板,将模板中的变量替换成数据,然后初始化渲染页面视图,并将每个对应的节点绑定更新函数,添加监听数据的订阅者,一旦数据有变动,收到通知,更新视图
 * 
 * 第三步:Watcher订阅名是observer和Compile之间的通信桥梁,主要做的事情就是
 * 1.在自身实例化时,往属性(dep)里面添加自己
 * 2.自身必须有一个update方法
 * 3.等到属性发生变动(dep.notice())通知的时候,能够调用自身的update方法,并触发Compile中的回调
 * 
 * 第四步:
 * MVVM作为数据绑定的入口，合 observer、 Compile和 Watcher三者，通过 Observer来监听自己的model数据変化，通过 Compile来解析编译模板指令，最终利用 Watcher搭起 Observer和 Compile之间的通信标梁，达到数据变化-＞视图更新新:视图交互变化(Input)-＞数据mode变更的双向绑定效果。
 * 
 * 
 */
// 由new Vue写法引发的思考
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

///src/index.js文件
import { initMixin } from "./init.js";
function Vue(options) {
  this._init(options);
}
// _init方法挂载到vue原型的方法
initMixin(Vue); //执行initMixin方法,给Vue的实例上绑定_init方法

//src/init.js
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, "beforeCreate");
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, "created");
  };
}

//src/state.js
function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  //   这里初始化的顺序依次是 prop>methods>data>computed>watch
}

function initData(vm) {
  let data = vm.$options.data;
  //获取传入的data;
  //vue组件data推荐使用函数,防止组件之间进行共享;
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  //将data数据代理到vm上面,此时我们可以用过this.a或者是this._data.a来进行访问
  for (const key in data) {
    proxy(vm, "_data", key);
  }
  //对数据进行检测
  observe(data);
}
//数据的代理
function proxy(object, sourceKey, key) {
  //此处通过object.key进行调用的时候,返回的就是this._data.a的值
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key];
    },
    set(newValue) {
      object[sourceKey][key] = newValue;
    },
  });
}

//以上操作中,在initState中咱们只要关注initData里面的observe是响应式的数据核心
// src/observe/index.js
function observe(value) {
  //判断传入的value的值

  if (
    Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value)
  ) {
    return new Observe(value);
  }
}

class Observe {
  constructor(value) {
    this.walk(value);
    def(value, "__ob__", this);
  }
  //对象上的所有属性依次进行观测
  walk(data) {
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      //获取当前的键
      let key = keys[index];
      //获取当前的值
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}

//def方法,增加不可枚举的属性
function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
//数据劫持的核心,
function defineReactive(data, key, value) {
  observe(value); //对获取的值进行递归处理
  //如果value的值还是一个对象会继续走一遍defineReactive 层层遍历一直到value不是对象为止
  var childOb = !shallow && observe(val);
  Object.defineProperties(data, key, {
    get() {
      //
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      //判断当前的Dep.target属于谁即当前的Watcher是谁?
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      value = newValue;
    },
  });
}
//数据劫持中会使用Dep这个类,也就是去创建一个事件池,并对事件池进行增删改查的操作

//自定义一个Dep事件池
let uid = 0;
class Dep {
  static target;
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}
Dep.target = null;
//定义一个栈,
const targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

//==========================================================
