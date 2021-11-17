class DonePlugin {
  //首先在每个的钩子上面都会有一个apply方法,方法上apply方法会被webpack的complier函数调用
  apply(complier) {
    //hooks 就是传入的complier阶段传入的hook
    complier.hooks.done.tap('custom', (state) => {
      console.log('编译完成', state)
      //此时输出的就是compilation对象
    })
  }
}
/**
 * webpack在启动后,在读取配置的过程中会先执行new BasicPlugin(options),初始化一个BasicPlugin获取其实例,在初始化compiler对象后,再调用basicPlugin.apply(compiler)给插件实例传入compiler对象,插件的实例获取到compiler对象以后,就可以通过compiler监听webpack广播出来的事件,并且就可以通过compiler对象去操作webpack
 */
/**
 * compiler对象:包含了webpack环境所有的配置信息,包含options,loaders,plugins这些信息,这个对象在webpack启动的时候被实例化,它是全局唯一的,简单的理解就是webapack实例
 *
 * compilation包含当前模块资源/编译生成资源/变化的文件等,当webpack以开发模式运行的时候,每当检测到一个文件变化,一次新的compilation将会被创建,compilation对象也提供了很多的事件回调供插件做拓展,通过compilation也能读取到compiler对象
 *
 * compiler和compilation的区别就在于complier代表了webpack从启动到关闭的声明周期,而compilation只是代表了一次新的编译.
 */
module.exports = BasicPlugin
