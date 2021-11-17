//解决数值更新,但是vue视图没有更新的问题

//vue.set方法的实现 sex/core/observe/index.js

function set(target, key, val) {
  // 如果当前传入的target的值是原始数值,则会报错提醒

  //判断传入的target是数组还是对象形式
  //如果是数组的形式

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  //如果是对象的形式
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  //如果是响应式属性,获取到当前的响应式对象
  const ob = target.__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  //执行通知的方法,更改视图的值
  ob.dep.notify()
  return val
}
// vue.set的实现原理
/**
 * 如果目标是数组,直接使用数组的splice方法触发响应式
 * 如果是对象,会先判断属性是否存在或者是是否是响应式,最终如果是要对属性进行响应式处理,则会通过调用defineReactive方法进行响应的响应式处理,
 */
