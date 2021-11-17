//computed和watch的区别:
// 一.计算属性和watch属性的区别

// 原文链接： https: //blog.csdn.net/zhoulei1995/article/details/114447005
/**
 * watch监听属性的使用
 *watch 当一个属性被多个值依赖的时候,此时会产生大量的开销,此时使用watch会比较合适
 *
 *
 *内部代码中watch和computed 的主要区别
 function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      // 脏数据条件下，会重新计算数据属性的值
      // 这是计算属性缓存的核心
      if (watcher.dirty) {
        watcher.evaluate()
      }
      // Dep.target 为渲染 watch，先不用搞明白为什么
      // 这里是计算属性为什么会影响数据变化的核心
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

 *
 */
// 监听某个属性watch的使用
// 1.,
// watch:{
//     obj(newName,oldName){
//         ....
//     }
// }

//2.对象的写法
// watch:{
//     obj:{
//         handel(newName,oldName){},
//         immediate:true //是否立即执行函数

//     }
// }

//3.监听属性内部的属性的变化
// watch:{
//     'obj.name':{
//         handel(){},
//         deep:true //deep的设置,当对象的属性值比较多的时候都会执行到handel.如果只是监听对象中的一个属性值,可以使用字符串的形式进行对象的属性监听

//     }
// }

/**
 * computed
 * computed是计算属性.,只有在它依赖发生变化的时候才会重新去求值
 * 一个值依赖多个值的变化,此时可以使用computed属性
 *
 *
 *
 */
//    1. 计算属性默认只有getter,这种方法默认就是返回的就是getter
//    computed:{
//        now(){

//        }
//    }

// 2. getter 和setter 的使用
// computed:{
//     now:{
//         get:function(){},
//         set:function(){}
//     }
// }

//当我们对计算属性进行修改的时候需要通过set函数进行修改,否则内部会出现报错
