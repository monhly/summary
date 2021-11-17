// vue中keep-alive的实现
/*
keep-alive是一个抽象组件:它自身不会渲染一个DOM元素,也不会出现在父组件中

keep-alive的实现,实现组件之间的缓存
钩子函数:
activated:组件渲染后进行调用
deactivated:组件销毁后进行调用

原理的实现:
vue.js内部将DOM节点抽象成一个个的Vnode节点,keep-alive组件的缓存也是基于VNode节点的而不是直接存储在DOM结构中
它将满足条件的组件在cache对象中缓存起来,在需要重新渲染的时候,再将vnode节点从cache对象中取出并渲染

 */
// 文章参考
// https://juejin.cn/post/6844903837770203144
// src/core/components/keep-alive.js
function render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot) // 找到第一个子组件对象
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) { // 存在组件参数
        // check pattern
        const name = getComponentName(componentOptions) // 组件名
        const { include, exclude } = this
        if ( // 条件匹配
            // not included
            (include && (!name || !matches(include, name))) ||
            // excluded
            (exclude && name && matches(exclude, name))
        ) {
            return vnode
        }

        const { cache, keys } = this
        const key = vnode.key == null // 定义组件的缓存key
            // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            ?
            componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '') :
            vnode.key
        if (cache[key]) { // 已经缓存过该组件
            vnode.componentInstance = cache[key].componentInstance
                // make current key freshest
            remove(keys, key)
            keys.push(key) // 调整key排序
        } else {
            cache[key] = vnode // 缓存组件对象
            keys.push(key)
                // prune oldest entry
            if (this.max && keys.length > parseInt(this.max)) { // 超过缓存数限制，将第一个删除
                pruneCacheEntry(cache, keys[0], keys, this._vnode)
            }
        }

        vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
    }
    return vnode || (slot && slot[0])
}
// src/core/components/keep-alive.js
function pruneCacheEntry(
    cache,
    key,
    keys,
    current
) {
    const cached = cache[key]
    if (cached && (!current || cached.tag !== current.tag)) {
        //删除缓存的VNode还要执行对应组件的destory
        cached.componentInstance.$destroy() // 执行组件的destory钩子函数
    }
    cache[key] = null
    remove(keys, key)
}