//Vue中的计算属性和watch属性的不同
//initComputed计算属性的方法'

import { noop } from "jquery";

  
var computedWatcherOptions={
    lazy:true
}
function initComputed(vm,computed){
    // vm 组件的实例  computed===>object对象
    const watchers=vm._computedWatchers=Object.create(null);

    for (const key in computed) {
    //   遍历传入的computed的值
        //此时传入的computed就是以对象的形式传入的
        /**
         * {
         * fullName: {get: ƒ}
            message: ƒ message()
        }
         * 
         */

         //获取computed上的值
        var userDef=computed[key]
        //判断当前的key值上传入的是对象的形式还是函数的形式,如果是对象的形式则调用对象上的get方法,如果是函数的形式,则直接调用该函数
        var getter=typeof userDef==='function'?userDef:userDef.get

        // 为每个计算属性设置watcher的观察者
        watchers[key]=new watchers(
            vm,getter,()=>{},computedWatcherOptions
        )
        

        //判断监听的属性是否被监听
        if(!key in vm){
            //如果此时的key值不在vm的实例上面,此时设置在全局的属性上面
            defineComputed(vm,key,userDef)
        }else{
            //以下的操作是对computed中的获取的属性进行判断,如果出现相同的值,则会对于一些实例进行报错的处理
            if(key in vm.$data){
                warn(("The computed property \"" + key + "\" is already defined in data."), vm);
            } else if (vm.$options.props && key in vm.$options.props) {
              warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
            } else if (vm.$options.methods && key in vm.$options.methods) {
              warn(("The computed property \"" + key + "\" is already defined as a method."), vm);
            }
        }
    }


}
var sharedPropertyDefinition={
    enumerable:true,
    configurable:true,
    get:()=>{

    },
    set:()=>{

    }
}

function defineComputed(target,key,userRef){
    //判断传入的useRef的值
    if(typeof userRef==='function'){
        //对于属性中的get进行一个赋值的操作
        sharedPropertyDefinition.get=()=>{

        }
        sharedPropertyDefinition.set=()=>{

        }
    }
    // 最后对传入的值进行Object的监听
    Object.defineProperty(target,key,sharedPropertyDefinition)
}



