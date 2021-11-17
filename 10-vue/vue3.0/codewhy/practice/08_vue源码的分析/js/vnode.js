//手动实现渲染系统
/**
 *功能一 h函数,用于返回一个vnode对象
 功能二 mount函数,用于将VNode挂载到DOM上;
 功能三 patch函数,用于将两个VNode进行对比,决定如何处理新的VNode;

 */
const h = (tag, props, children) => {
  return {
    tag,
    props,
    children,
  }
}
const mount = (vnode, container) => {
  const el = (vnode.el = document.createElement(vnode.tag))
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((child) => {
        mount(child, el)
      })
    }
  }
  container.appendChild(el)
}

//patch函数的实现
/**
 * 思路分析:
 * pacth 函数主要是分为两种情况;
 * n1:旧节点 n2新节点
 * 1.n1和n2是不同类型的节点,
 *  此时需要找到n1的el父节点,删除原来n1节点的el
 *  挂载n2节点到n1的el的父节点上
 * 2.n1和n2是相同的节点
 *  首先处理props的情况:先将新节点的props挂载到el上,判断旧节点上的props是否需要在新节点上,如果不需要,就删除对应的属性;
 *  其次是处理children的情况:
 *      判断传入的新节点的类型,如果传入的是一个字符串,那么直接调用进行el.textContent=newChildren;
 *      如果新节点是不同的类型:
 *                  旧节点是一个字符串:将el的textContent设置为空的字符串;旧节点是一个字符串的类型,那么遍历新节点,挂载到el上面;
 *                  旧节点是一个数组,
 *                      取出数组的最小长度,遍历所有的节点,新旧节点进行path\操作
 *
 */
