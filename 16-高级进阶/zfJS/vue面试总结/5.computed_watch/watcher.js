// wacther属性的的实现
// watcher的三种实现方式
/**
 * 1.,
 * 函数式写法
// watch:{
//     obj(newName,oldName){
//         ....
//     }
// }

//2.对象的写法
// watch:{
//     obj:{
//         handler(newName,oldName){},
//         immediate:true //是否立即执行函数

//     }
// }

//3.监听属性内部的属性的变化
// watch:{
//     'obj.name':{
//         handler(){},
//         deep:true //deep的设置,当对象的属性值比较多的时候都会执行到handel.如果只是监听对象中的一个属性值,可以使用字符串的形式进行对象的属性监听

//     }
// }
 * 
 */

import { isPlainObject } from "jquery";

function initWatch(vm, watch) {
  // 遍历传入的watch
  for (const key in watch) {
    var handler = watch[key];
    //判断获取监听的属性是否是数组的形式
    //如果是数组的形式,需要对数组的每个属性进行遍历
    if (Array.isArray(handler)) {
      for (let index = 0; index < handler.length; index++) {
        createWatcher(vm, key, handler[index]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

//expOrFn 传入的属性值 handler 传入的方法 
function createWatcher(vm, expOrFn, handler, options) {
    //如果传入的是对象的形式,则会调用对象上的handeler方法,
    if(typeof handler==='object'){
        options=handler;
        handler=handler.handler;

    }
    if(typeof handler==='string'){
        handler=vm[handler];

    }
    return vm.$watch(expOrFn,handler,options)
}
function $watch(
    expOrFn,
    cb,
    options
){

//cb传入的callback的回调函数

    var vm=this;
    //判断传入的handler函数是属于什么类型的
    if(typeof cb==='object'){
        return createWatcher(vm, expOrFn, cb, options)
    }
    options=options||{};
    //这里设置为true,则代表当前的watch是用用户自定义的一个watch
    options.user=true;
    var  watcher=new Watcher(vm, expOrFn, cb, options);
    //判断当前传入的属性值是否有immediate属性,
    if (options.immediate) {
        var info = "callback for immediate watcher \"" + (watcher.expression) + "\"";
        pushTarget();
        invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
        popTarget();
      }
      return function unwatchFn () {
        watcher.teardown();
      }

}