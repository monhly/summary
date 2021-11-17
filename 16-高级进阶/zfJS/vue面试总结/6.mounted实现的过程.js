//聊聊vue2.5的过程,即实现diff算法的区别

//数据在mounted的过程中都发生了什么
/**
 * vue的内部通通过调用$mounted方法来进行挂载.一般来说,vue有两条渲染的路径,分别对应着生命周期中的mounted和updated两个钩子函数;
 * 1.组件实例初始化创建生成DOM:在该过程中,初始的VNode是一天个真实的DOM节点或者是undefined
 *$mounted => mountComponent => updateComponent => _render => _update => patch => createElm => nodeOps.insert => removeVnodes
 *
 * 2.组件数据更新时更新DOM:在该过程中初始化Vnode为之前的prevVnode,不是真实的DOM节点;
 *
 */

/**
 * patch实现的原理:
 * patch中接收了6个参数,其中两个主要的参数是vnode和oldnode里那个节点,也就是新旧两个虚拟节点,
 *
 *1;如果vnode不存在,而oldnode存在,则调用invodeDestortyHook进行销毁旧的节点;
    2:如果oldNode不存在,而vnode存在,则会创建createEle创建新的节点;
    3:如果oldNode和Vnode都存在;
        3.1如果oldVnode不是真实的节点而且和vnode是相同的节点,则会嗲用patchVnode进行patch;
        3.2如果oldVnode是真实的节点,则会先把真实的节点转为Vnode,在调用cretaElm创建新的DOM节点,并插入到真实的父节点中,同时调用removeVnodes将旧节点从父节点删除;

 */
