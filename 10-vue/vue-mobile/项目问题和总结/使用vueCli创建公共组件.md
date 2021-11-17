# 使用vue-cli创建公共组件

在前端奋战了这么长时间,用惯了vant,elementUI等第三方的插件。今日突然心血来潮,就手动教大家封装一个公共组的组件，使你们也能够成为在npm上有库的人。本次组件以button按钮为例

# 1.初入山门

在开始前前，需要对Vue的全局组件和局部组件进行一些了解

## 全局组件和局部组件

### 局部组件

- 绝大多数vue项目就只有一个实例(new Vue()只运行一次)，即:`一个项目就只有一个vue实例`

- 我们前面写组件一般都是直接写在vue实例中的，也就是局部组件

- 这个组件不能在另一个项目中使用（复制粘贴代码不算哈）。

- 典型使用格式：在vue实例中

  

  ```
  import XXX from "./xxx/index.vue"
  {
  	data(){}
  	components:{
  		// 你的组件
  		XXX
  	}
  }
  ```

  



### 全局组件

- 组件在所有的vue实例中的都可以使用。
- 与具体的vue项目无关，最典型的体现是是ui框架(element-ui, ant-design, i-view, vant)
- 它采用Vue.component来创建。



## 用Vue.component创建全局组件

[Vue.component](https://cn.vuejs.org/v2/api/?#Vue-component)



> Vue.component(id,definition)
>
> - **参数**：
>
>   - `{string} id`
>   - `{Function | Object} [definition]`
>
> - **用法**：
>
>   注册或获取全局组件。注册还会自动使用给定的`id`设置组件的名称
>
>   ```
>   // 注册组件，传入一个扩展过的构造器
>   Vue.component('my-component', Vue.extend({ /* ... */ }))
>   
>   // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
>   Vue.component('my-component', { /* ... */ })
>   
>   // 获取注册的组件 (始终返回构造器)
>   var MyComponent = Vue.component('my-component')
>   ```
>
> - **参考**：[组件](https://cn.vuejs.org/v2/guide/components.html)



## 示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创建并使用button组件</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
</head>
<body>
  <div id="app">
    <my-button></my-button>
    <hr>
    <com1></com1>
  </div>
  <script>
    Vue.component("MyButton",{
      template:"<div><button>全局组件：按钮</button></div>"
    })

    new Vue({
      el:"#app",
      components:{
        "com1":{
          template:"<div><button>局部组件：按钮</button></div>"
        }
      }
    })
  </script>
</body>
</html>
```

以上代码中：

- MyButton是全局注册的组件
- com1是局部组件

[https://cn.vuejs.org/v2/guide/components-registration.html#%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99](https://cn.vuejs.org/v2/guide/components-registration.html#组件名大小写)



上面我们就实现了创建并使用全局组件了，这是一种比较原始的方式，在vue中，它给我们提供另一种比较优雅的方式:Vue.use

## 使用Vue.use()加载插件

Vue.use()是Vue对象上的全局方法，它用来把第三方插件挂载在vue上。注意这里的Vue是大写的V。

关于Vue.use的介绍建议参考https://www.jb51.net/article/146461.htm

### [格式](https://cn.vuejs.org/v2/api/?#Vue-use)

> **Vue.use(plugin)**
>
> - **功能**：
>
>   安装 Vue.js 插件。
>
> - 参数：plugin。它表示要安装的插件
>
>   - 可以是一个对象
>   - 也可以是一个函数
>
> - **用法**：
>
>   如果plugin是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
>
>   该方法需要在调用 `new Vue()` 之前被调用。
>
>   当 install 方法被同一个插件多次调用，插件将只会被安装一次。
>
> - **参考**：[插件](https://cn.vuejs.org/v2/guide/plugins.html)





### 参考elementUI、vant组件

>  Vue-Router
>
>  ```javascript
>  import VueRouter from "vue-router"
>  import Vue from "vue"
>  import Index from "../pages/index.vue"
>  import Headline from "../pages/headline.vue"
>  import Tab from "../pages/tab.vue"
>  import Dialog from "../pages/dialog.vue"
>  Vue.use(VueRouter)
>  export default new VueRouter({
>   routes: [
>       { name: 'home', path: '/', component: Index },
>       { name: 'headline', path: '/headline', component: Headline },
>       { name: 'tab', path: '/tab', component: Tab },
>       { name: 'dialog', path: '/dialog', component: Dialog }
>   ]
>  });
>  
>  ```
>
>  



> element-ui的使用 https://element.eleme.cn/#/zh-CN/component/quickstart#yin-ru-element
>
> ```
> import Vue from 'vue';
> import ElementUI from 'element-ui';
> import 'element-ui/lib/theme-chalk/index.css';
> import App from './App.vue';
> 
> Vue.use(ElementUI);
> 
> new Vue({
> el: '#app',
> render: h => h(App)
> });
> ```



> vant组件的库的使用
>
> https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-san.-dao-ru-suo-you-zu-jian
>
> ```javascript
> import Vue from 'vue';
> import Vant from 'vant';
> import 'vant/lib/index.css';
> 
> Vue.use(Vant);
> ```
>
> 



### 用Vue.use()来改造代码

```html
<div id="app">
    <my-button></my-button>
    <hr>
</div>
<script>
    var obj = {
        install (abc) {
            abc.component("MyButton",{
                template:"<div><button>全局组件：按钮</button></div>"
            })
        }
    }
    
    // 在Vue.use(obj)中，它做了两件事：
    // 1. 执行obj.install()
    // 2. 传入Vue。具体在上面的代码中，就是把Vue传给abc.
    Vue.use(obj)

    new Vue({
        el:"#app"
    })
</script>

```



### 添加一个组件

```javascript
<div id="app">
    <my-button></my-button>
    <my-headline></my-headline>
    <hr>
  </div>
  <script>
    var MyButton = {
        name:"MyButton",
        template:"<div><button>全局组件：按钮</button></div>"
    }
    var MyHeadline = {
        name:"MyHeadline",
        template:"<div>全局组件:标题</div>"
    }
    var obj = {
      install (vue) {
        vue.component(MyButton.name,MyButton)
        vue.component(MyHeadline.name,MyHeadline)
      }
    }
    Vue.use(obj)

    new Vue({
      el:"#app"
    })
  </script>
```



## 小结

vue开发公共组件需要用到Vue.use()和Vue.component()两个api。



# 2.创建项目

目标：

通过vuecli创建项目，这个项目创建的目的有三个：

- 维护组件库（不是某个具体的业务项目哦，而是造轮子）
- 本地测试组件库
- 后期整体打包上传到npm



## 使用脚手架工具创建项目

命令：

```bash
vue create XXXXX
```

要点：

- 只需要选中Babel + Router 

  

```
Vue CLI v3.11.0
┌───────────────────────────┐
│  Update available: 4.2.3  │
└───────────────────────────┘
? Please pick a preset: (Use arrow keys)
> normal (vue-router, vuex, less, babel, eslint)
  default (babel, eslint)
  Manually select features  
```



```
? Please pick a preset: Manually select features
? Check the features needed for your project:
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
>(*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 ( ) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing 
 
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?
> In dedicated config files
```



## 调整目录结构

我们这个项目不是用来去生成某个具体的业务功能的，而是用来写自己公共UI组件，为了方便对项目的理解，我们对目录结构进行一些调整。

### 调整明细

1. 添加一个名为packages的文件夹，用来保存所有的公共组件
2. 把原来的src改成examples，这里的代码用来对组件进行测试。
3. ![image-20200422201106786](C:\Users\monster\AppData\Roaming\Typora\typora-user-images\image-20200422201106786.png)

```
|-packages(额外添加的)    所有的组件放在这里。
|-examples(把src改成这个） examples下的内容是来测试packages下的组件的使用
```

### 设置vue.config.js 

由于这里改了src这个系统默认的目录名字，为了项目能跑起来，还需要做一些设置。具体来说，在根目录下创建vue.config.js，内容如下：

```
const path = require('path')
module.exports = {
  // 将 examples 目录添加为新的页面
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('./examples')
      }
    }
  }
}

```

## 创建第一个组件

在packages目录下建立button/button.vue。先随意添加一些内容，等我们后面再来调整。

目前，它的内容如下。

```
<template>
  <div>
    <button>我是一个按钮</button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  data () {
    return {}
  }
}
</script>
```

请务必确保组件都有name属性。

## 创建入口文件

在packages目录下，创建index.js文件。用它来收集所有定义在packages目录下的组件，并按vue插件的格式做导出。

```javascript
import Button from './button/button.vue'

export default {
  install (Vue) {
    Vue.component(Button.name, Button)
  }
}
```

## 注册为全局组件

在examples下的main.js目录下

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import UI from '../packages/index'
Vue.use(UI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

```

## 测试使用这个组件

在examples/views/about.vue，直接使用这个组件

```javascript
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <my-button></my-button>
  </div>
</template>

```



## 目录结构

![image-20200316192242077](asset/image-20200316192242077.png)

## 工作流程

![image-20200316191334657](asset/image-20200316191334657.png)



## 类似去完成另一个组件Headline

在packages下创建headline/headline.vue

```
<template>
  <div>
    <h1>我是一个标题</h1>
  </div>
</template>

<script>
export default {
  name: 'MyHeadline',
  data () {
    return {}
  }
}
</script>

```

在packages/index.js中引入headline，并导出

```
import Button from './button/button.vue'
import Headline from './headline/headline.vue'
export default {
  install (Vue) {
    Vue.component(Button.name, Button)
    Vue.component(Headline.name, Headline)
  }
}
```



现在已经有两个比较简单的组件了，虽然它们都还没有具体的功能，但我们已经开了头，下面去打包公共组件，并上传到npm供他人下载使用。



# 3.打包组件库，上传npm

目标：打包组件库，上传到npm上。

难点:

- 自定义打包功能
- npm包发布



## [把组件代码打包](https://cli.vuejs.org/zh/guide/build-targets.html#%E6%9E%84%E5%BB%BA%E7%9B%AE%E6%A0%87)

在vue-cli脚手架工具中，当你运行 `vue-cli-service build` 时，你可以通过 `--target` 选项指定不同的构建目标。它允许你将相同的源代码根据不同的用例生成不同的构建。

### 理论介绍

#### 打包成应用 

应用模式是默认的模式。在这个模式中：

- `index.html` 会带有注入的资源和 resource hint
- 第三方库会被分到一个独立包以便更好的缓存
- 小于 4kb 的静态资源会被内联在 JavaScript 中
- `public` 中的静态资源会被复制到输出目录中

#### 打包成库

你可以通过下面的命令将一个单独的入口构建为一个库：

```bash
vue-cli-service build --target lib --dest 目标目录 --name 你的库名 入口地址
```

示例

```
vue-cli-service build --target lib --name mylib ./packages/index.js
```

- --target lib。约定以库的方式进行打包
- --name mylib。打包之后的库名字是mylib
- ./packages/index.js 。打包入口。

它会在项目根目录下的dist下创建

```
 dist\mylib.umd.min.js    14.18 KiB                5.33 KiB
 dist\mylib.umd.js        44.16 KiB                11.33 KiB
 dist\mylib.common.js     43.78 KiB                11.21 KiB
```

- common。符合commonJs 规范的包，根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。
- umd(Universal Module Definition)。符合直接给浏览器或者amd loader使用的包。

>  关于amd,umd,common的参考：https://www.jianshu.com/p/ec2844e0aea9。

### 实践操作

在package.json中添加一条script.

```diff
 "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
+    "b": "vue-cli-service build --target lib --name demo_vue_ui --dest lib ./packages/index.js"
  }
```

在命令行中运行`npm run b`。如果没有什么错误，你应该可以看到lib目录下的内容了。

> 如果这个过程报错提示`no-console`之类的，你可能需要把packages下所有代码中的console都注释掉。

## 修改package.json以方便上传npm

找到package.json文件，注意修改如下三个地方：

- 取消私有。把 private属性设置成false。
- 设置版本号。一般默认是'1.0.0'，我们只能把它改小一些，因为随着后续功能的开发，我们会升级版本号。所以现在是第一个版本。
- 修改main入口。它用来设置在其它项目中通过import "demo_vue_ui"时要进入的入口，把它改成我们打包之后的地址。

```javascript
  {
    "name": "demo_vue_ui",
    "version": "0.1.0",
  	"private": false,
    // dist/mylib.umd.min.js 是你上面打包的那个js文件的地址
  	"main": "dist/mylib.umd.min.js"
  }
```



## 上传到npm

### 注册npm帐号

> 它会向你的邮箱发一封邮件，你需要去激活一下帐号，这封邮件极可能在你的邮箱的垃圾箱中找到

- 注册npm帐号  (只需一次，随后不需要)

### 连接npm

在命令行中登陆npm帐号， 只需一次，随后不需要。

```
npm adduser  
```

这个命令需要输入三个信息以供连接上npmjs。用户名，密码，邮箱（是你在npmjs官网上注册时使用的信息）。如果你已经不是第一次连接了，这一步是可以省略的。

![image-20200212230007960](asset/image-20200212230007960-1584427401530.png)

你也可以通过如下命令检查自己是否连接成功了。

```bash
npm who am i
```

如果这句命令可以看到你的个人信息，说明你已经连接成功了，则可以进行下一步。如果想退出当前用户名，也可以通过如下命令来退出。

```bash
npm logout
```

### 切换当前npm镜像源到npmjs.org

由于我们需要把包上传到npm上，所以要先确保当前的npm源是npmjs.org。与之相关的命令有如下两条：

```bash
 # 查看当前的npm的registry配置，确保是https://registry.npmjs.org
npm config get registry

# 如果不是，可以通过如下命令来设置
npm config set registry https://registry.npmjs.org 
# 手动设置registry
```

或者使用nrm工具来设置。

###  把包上传到npm

在上传包之前，要先检查一下包名是否被他人使用了。

有两种方式：

- 进入npm官网，搜索一下包名，如果能找到说明被占用了。
- 通过`npm view 包名` 。这个命令用来查看 某个包的信息如果返回404，说明这个项目名在npm官网上找不到，此时你就可以使用。否则，说明不可用。

如果你确定你的包名没有被占用，只需要如下一条命令就可以实现上传到npm了。

```
 npm publish 
```



如果npm publish 出错了，出错的可能是：

- 这个包名（package.json中的name）被别人先占用了。
- 如果你是第一次注册npm的话，先去你的邮箱里去验证邮件。(否则会给你403错误。you must verify your email before publishing a new package)
- 包的版本号不对：每次publish时，包的版本号都应该要大于之前的版本号。
- 你的npm镜像不是官网。
- 文件过大。你可能需要创建`.npmignore`文件来设置在打包时要忽略哪些文件。如下是一个demo。在项目根目录下创建.npmignore文件，其中的内容就和设置.gitingnore一样，用来设置在上传到npm时要忽略的文件和文件夹。



如果没有报错，则表示一切ok，你可以用你的帐号密码登陆npm，去查看你名下的package是否有了你上传的包了。

## 下载使用

在其它任意的项目中，通过`npm install myNpm`即可来安装包。 然后，告诉你的小伙伴们去下载使用吧。

## 删除包

```cpp
npm unpublish --force //强制删除
```

如果你的包没有什么用处，建议删除掉，以节约公共资源。

## 更新包

1. 修改代码，保存。
2. 更新版本号。可直接在package.json中修改：只能改大，不能改小。
3. 重新publish





<img src="asset/image-20200213171733854.png" alt="image-20200213171733854" style="zoom:50%;" />









# 4.引入 semantic美化样式

目标：

- 引入semantic.css来提供组件库的样式
- 完成按钮组件的功能

## semantic基本介绍

它是一个前端ui框架。类似于bootstrap。

- semantic

- bootstrap

## 安装包

在我们的项目中，我们只需要样式，而不需要.js代码，所以我们直接去安装semantic-ui-css。

https://www.npmjs.com/package/semantic-ui-css

```
npm i semantic-ui-css
```



## 在packages中引入css样式

index.js中，引入样式

```
import 'semantic-ui-css/semantic.css'
import MyButton from './button/button.vue'
export default {
  install (Vue) {
    Vue.component('MyButton', MyButton)
  }
}
```

## 修改button组件

补充css类"ui button"，这个类已经在semantic.css中定义了的。具体参考[这里](https://semantic-ui.com/elements/button.html#) https://semantic-ui.com/elements/button.html#

```javascript
<template>
  <div>
    <button class="ui button">我是一个按钮</button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  data () {
    return {}
  }
}
</script>

```

## 测试效果

在examples目录下的组件中再次去感受一下按钮的效果。



# 5.完善button组件的功能

- 大小
- 自定义内容
- 动画按钮
- click功能



## 自定义按钮内容

目标：允许用户自已设置按钮上的方案。

技能点：默认插槽。

### 确定测试用例

```
 <my-button>我是一个按钮</my-button>
 <my-button>确定</my-button>
```

### 修改组件代码

> 修改packages/button/button.vue中的代码。添加一个插槽即可。



```html
<div class="ui button">
   <slot>我是默认内容</slot>
</div>
```

### 工作原理图

![image-20200316200931550](asset/image-20200316200931550.png)

## 定义按钮大小

目标：预设尺寸，供用户选用。

思路：在semantic样式体系中，它通过mini,tiny,small，medium,large,big,huge,massive来控制，我们可以直接来借用。

例如：

![image-20200316201611659](asset/image-20200316201611659.png)

对应html代码

```html
<button class="mini ui button">Mini</button>
<button class="tiny ui button">Tiny</button>
<button class="small ui button">Small</button>
<button class="medium ui button">Medium</button>
<button class="large ui button">Large</button>
<button class="big ui button">Big</button>
<button class="huge ui button">Huge</button>
<button class="massive ui button">Massive</button>
```

观察上面的效果，我们提取表示尺寸的关键字，在使用组件时通过prop传入。



### 修改测试用例

```html
<template>
  <div>
    <h1>测试按钮的功能</h1>
    <my-button>来，点赞再走!</my-button>
    <br>
    <my-button></my-button>
    <br>
    <my-button size="mini">mini大小的按钮</my-button>
    <br>
    <my-button size="huge">huge大小的按钮</my-button>
    <hr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: 'mini'
    }
  }
}
</script>

```



### 修改button组件的代码

- 补充一个prop。用来接收size。
- 根据这个size来生成一个对应的class。

```
<template>
  <div>
    <button class="ui button" :class="size">
      <slot>我是一个按钮</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    }
  }
}
```

在设置prop时，有一点要注意:

- validator



## 支持animated动画

目标：允许用户去设置按钮的切换动画状态

思路：借用semantic中的animated类

### 确定测试用例

对照semantic中按钮的动画效果来提炼用户的使用方式，即先要给出测试用例。

```html
<my-button animated >
   <div slot="hidden">$10000</div>
   <div slot="visible">不要错过哈</div>
</my-button>

<my-button animated="fade" >
   <div slot="hidden">$10000</div>
   <div slot="visible">不要错过哈</div>
</my-button>
```



### 修改组件代码

```
export default {
  name: 'MyButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator (val) {
        // 只要传入 size属性，就会
        // 进入到这个函数中，
        // 如返回true,则表示生效。
        // 如返回false，则表示不允许

        // 检验思路：
        // 如果传入的size是：mini,medium,huge,massive.... 就ok
        // 否则就返回false
        // console.log(val)
        // includes检查这个数组中，是否包含这个元素。
        return ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'].includes(val)
      }
    },
    animated: {
      type: String,
      default: ''
    }
  },
  computed: {
    cClass () {
      var classArr = [this.size]
      // 当前用户是否启用动画
      // 如果启用了动画，要添加两个类 : animated 动画的名字
      this.animated && classArr.push(`animated ${this.animated}`)
      return classArr.join(' ')
    }
  }
}
</script>
```



模板

```html
<template>
  <!-- slot:插槽。 -->
  <div class="ui button" :class="cClass">
    <template v-if='animated'>
  <!-- $slots表示收集到的所有的插槽 -->
  <!-- hidden content 是在semantic-ui约定的类 -->
  <!-- visible content 是在semantic-ui约定的类 -->
      <div v-if="$slots.hidden"  class="hidden content">
          <!-- 具名插槽 -->
          <slot name="hidden"></slot>
      </div>
      <div v-if="$slots.visible"  class="visible content">
          <!-- 具名插槽 -->
          <slot name="visible"></slot>
      </div>
    </template>
    <template v-else>
      <!-- 不带动画效果的按钮 -->
     <slot>我是默认内容</slot>
    </template>
  </div>
</template>
```

注意:

- template的用法。它不会产生新的dom容器，还可以用来包裹其它元素。
- 用`$slots.插槽名`来获取指定插槽的内容。



## 提供click功能

如果希望在使用myButton组件时添加click功能，如下，在测试用例上添加代码

```html
 <my-button @click="hClick"></my-button>
```

```javascript
methods: {
    hClick () {
      window.alert(1)
    }
  }
```

将不会得到任何效果，因为在@click只能加在原生dom元素上，而这里是一个组件。可以使用@click.native来达到目标。



更准确的做法是在组件内部抛出click事件来。

```html
<template>
  <!-- slot:插槽。 -->
  <div class="ui button" :class="cClass" @click="hEmitClick">
   // ...
  </div>
</template>
export default {
  name: 'MyButton',
  methods: {
    hEmitClick () {
      this.$emit('click')
    }
  }
}
```



# 6.实现headline组件功能

- 在组件中添加headline组件（类似于h1,h2..这种标签效果）



## 创建基本的文件结构

- 创建组件：packages/headline/headline.vue
- 全局注册。packages/index.js.引入headline
- 测试组件
  - 在examples下添加路由
  - 在examples下添加页面

##  内容

- 允许用户传入级别(h1,h2,h3,h4,h5,h6)
- 允许设置子标题

## 使用方式

希望用户如下方式来使用

```
<my-headline :level="1">
	标题
<div slot="sub">
	子标题
</div>
</my-headline>
```



## 允许用户传入级别

用v-if处理这个级别是**很不漂亮的写法**！！！

```html
<template>
  <div>
    <h1 v-if="level===1" class="ui header" :class="size">
      <div class="content">
        <slot></slot>
        <div class="sub header"><slot name="sub"></slot></div>
      </div>
    </h1>

    <h2 v-if="level===2" class="ui header" :class="size">
      <i v-if="icon" class="icon" :class="icon"></i>
      <div class="content">
        <slot></slot>
        <div class="sub header"><slot name="sub"></slot></div>
      </div>
    </h2>
  </div>

</template>

<script>
export default {
  name: 'MyHeadline',
  // 定义属性来收集用户的输入
  props: {
    level: {
      type: Number, // h1,h2,h3...
      default: 1,
      required: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

```



# 7.Render函数

## 导入

如下代码你见过吗？

```javascript
import Vue from 'vue'
import App from './App.vue'
var app = new Vue({
    el: 'app',
    render: h=>h(App)
})
```

render的作用是什么？它其中的h是什么意思？



一个vue组件能够展示在页面上，因为它有template，或者是render函数。它必须有这两者之一。

一般情况下，我们使用template就可满足需求了。但在一些特定的情况下，我们要使用reander函数。

## 宏观概览-render



<img src="./asset/image-20200228125207744.png" alt="image-20200228125207744" style="zoom:50%;" />

Vue的应用程序的主要工作步骤：

- 模板通过编译生成AST

- 由AST生成Vue的`render`函数（渲染函数）

- 渲染函数结合数据生成Virtual DOM树，Diff和Patch后生成新的UI。

  

- **模板**：Vue的模板基于纯HTML，基于Vue的模板语法，我们可以比较方便地声明数据和UI的关系。
- **AST**：AST是**Abstract Syntax Tree**的简称（抽象语法树），Vue使用HTML的Parser将HTML模板解析为AST，并且对AST进行一些优化的标记处理，提取最大的静态树，方便Virtual DOM时直接跳过Diff。
- **渲染函数**：渲染函数是用来生成Virtual DOM的。Vue推荐使用模板来构建我们的应用界面，在底层实现中Vue会将模板编译成渲染函数，当然我们也可以不写模板，直接写渲染函数，以获得更好的控制 （这部分是我们今天主要要了解和学习的部分）。
- **Virtual DOM**：虚拟DOM树，Vue的Virtual DOM Patching算法是基于**[Snabbdom](https://github.com/snabbdom/snabbdom)**的实现，并在些基础上作了很多的调整和改进。
- **Watcher**：每个Vue组件都有一个对应的`watcher`，这个`watcher`将会在组件`render`的时候收集组件所依赖的数据，并在依赖有更新的时候，触发组件重新渲染。你根本不需要写`shouldComponentUpdate`，Vue会自动优化并更新要更新的UI。

上图中，`render`函数可以作为一道分割线，`render`函数的左边可以称之为**编译期**，将Vue的模板转换为**渲染函数**。`render`函数的右边是Vue的运行时，主要是基于渲染函数生成Virtual DOM树，Diff和Patch。



```
模板 -> 进行编译 -> 生成ast树 -> 数据绑定 -> 成render函数 -> 成虚拟dom -> 真实dom
```

如果直接使用render函数，就省略了模板的编译过程，vue运行的更快。



## 有两种方式来定义组件的模板

Vue推荐在绝大多数情况下使用`template`来创建你的HTML。然而在一些场景中，需要使用JavaScript的编程能力和创建HTML，这就是**`render`函数**，它比`template`更接近编译器。

- template
- render

```html
<div id="app">
    <com1></com1><br>
    <com2></com2>
</div>
<script type="text/javascript">

    Vue.component("com1",{
        data(){
            return {title:"com1"}
        },
        template:`<h2>vue-{{title}}</h2>`
    })
    Vue.component("com2",{
        data(){
            return {title:"com1"}
        },
        render(h){
            return h('h2',[`vue-`,this.title])
        }
    })
    vm = new Vue({
        el:"#app",
    })

</script>
```

## 认识render

### 基本格式

在组件中，它就是一个配置项，与data,methods，computed,create一样。

```javascript
{
    data(){},
    methods:{},
    // h 是一个形参
    render(h){
        return h(参数1,参数2,参数3);
        // 参数1： String | Object | Function
        //        是一个html标签，或者是一个组件，或者是一个函数 

        // 参数2：Object。是对参数1所表示的对象的设置。

        // 参数3：参数1表示的对象的子对象。
    }
}
```



### 形参

在render()被调用时，vue会自动传入一个实参 给h。这个实参是一个函数（createElement），在组件内部，我们也可以通过`this.$createElement`来获取它。

```javascript
Vue.component("com2",{
    data(){
        return {title:"com1"}
    },
    render(h){
        console.log(this.$createElement === h); //true
        return h('h2',[`vue-`,this.title])
    },
    mounted(){
        console.log(this.$createElement)
    }
})
```

### 返回值

render()方法使用传入的h函数来创建一个东东，然后再返回出去，那么，这个东东是什么？为什么它能起到和template一样的效果？

结论是：**vnode**，也就是我们说的虚拟dom.



> 它更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“**VNode**”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

## createElement

render()是依赖于createElement来创建虚拟dom的，所以，我们要来具体学习它的用法。

### 功能

创建虚拟dom(VNode)。

### 格式

```javascript
createElement h(参数1,参数2,参数3);
// 参数1： String | Object | Function
//        是一个html标签，或者是一个组件，或者是一个函数 

// 参数2：Object。是对参数1所表示的对象的设置。

// 参数3：参数1表示的对象的子对象。理解为html标签中的子标记（如:ul下的li）
```

### 参数1

取值有三种可能：`{String | Object | Function}`

第一个参数对于`createElement`而言是一个必须的参数，这个参数可以是字符串`string`、是一个对象`object`，也可以是一个函数`function`。

下面是对应的示例：

字符串

```javascript
Vue.component('custom-element', {
    render(h) {
        return h('div')
    }
})
```

产生一个空标签`<div></div>`

**对象 (就是一个组件对象)**

```javascript
Vue.component('custom-element', {
    render(h){
        return h({
            template: `<h2>{{title}}</h2>`,
            data(){return{title:"vue"}}
        })
    }
})
```

得到的真实dom:`<h2>vue</h2>`

函数

```javascript
Vue.component('custom-element', {
    render: function (createElement) {
        var eleFun = function () {
            return {
                template: `<div>Hello Vue!</div>`
            }
        }
        return createElement(eleFun())
	}
})
```



### 参数2

参数2是一个对象，它用来表示对参数1的描述。它是可选的。

```javascript
{
    class:{ className1 : true, className2: true},
    style:{
        color: 'red',
        fontSize:'20px'
        ....
    },
    // 正常的HTML特性
    attrs:{
        id:"yourId"
    },
    //  组件的props
    props:{
        
    },
    //  DOM属性
    domProps:{
        innerHTML: "baz"
    },
    // 事件，this.$emit
    on:{
        click: this.hClick,
        customEvent:this.hCustomEvent,
        ......
    },
    // 原生事件
    nativeOn:{
        click: this.nativeClickHandler
    },
    directives:[{
      name:"",
      value:"",
      expression: "1 + 1",
      arg:'foo',
      modifiers:{bar:true}
    }]
}
```

### 参数3

格式是字符串或数组。用来表示子内容。（理解为ul中的li，ul是父级节点，li是子级节点）

- 字符串。它最终会渲染成元素的内容。
- 数组。它最终会在为元素的子节点

```javascript
render(h){
    return h("div",{class:"a"},[h('span','span的内容'),h('p','p的内容')])
},
```

虚拟dom如下：

![image-20200228152557313](asset/image-20200228152557313.png)

对应生成的dom结构是：

```html
<div class="a"><span>span的内容</span><p>p的内容</p></div>
```



## 示例：生成指定级别的标题

常规方式：使用template

```javascript
Vue.component("headline",{
    props:{
        level:{
            default:1
        }
    },
    template:`
        <div>
            <h1 v-if="level==1"><slot></slot></h1>
            <h2 v-if="level==2"><slot></slot></h2>
            <h3 v-if="level==3"><slot></slot></h3>
            <h4 v-if="level==4"><slot></slot></h4>
        </div>
       `
})
```

使用render

```javascript
Vue.component("headline",{
    props:{
        level:{
            default:1
        }
    },
    render(h){
        return h('div',[h('h'+this.level,[this.$slots.default])])
    }
})
```



## 示例：改写v-for

把如下组件的template用render来改写

```javascript
Vue.component("com-list",{
    data(){
        return {
            items:[1,2,3]
        }
    },
    template:`<ul>
    	<li v-for="item in items">{{ item }}</li>
	</ul>` 
})
```

改写如下：

```javascript
render(h){
    let child = this.items.map(item=>{
        return h('li',item)
    })
    console.log(child)
    return h('ul', child)

    // // 创建一个子元素
    // let li1 = h('li','1')
    // let li2 = h('li','2')
    // let li3 = h('li','3')
    // let li4 = h('li','4')
    // // [li1] 是参数3，用来设置ul的子元素
    // return h('ul',[li1,li2,li3,li4])
}
```





# 8.改写Headline组件

- 用 Render函数来改写headline组件

```
<my-headline :level="1">
	标题
<div slot="sub">
	子标题
</div>
</my-headline>
```

内容

- 允许用户传入级别
- 允许设置子标题



## 组件代码

headline.vue代码如下

```javascript
<script>
export default {
  name: 'MyHeadline',
  // 定义属性来收集用户的输入
  props: {
    level: {
      type: Number, // h1,h2,h3...
      default: 1,
      required: false
    }
  },
  data () {
    return {

    }
  },
  render (h) {
    //  <h2 class="ui header">
    //   <div class="content">
    //     默认插槽的内容
    //     <div class="sub header">具名插槽的内容</div>
    //   </div>
    // </h2>
    // 判断是否有icon
    let content = null
    // 生成第二个子元素content
    // 是否有具名插槽
    if (this.$slots.sub) {
      // 是有副标题的
      // 创建副标题
      const subContent = h('div', { class: 'sub header' }, [this.$slots.sub])
      // 内容包含两个部分：默认插槽 + 具名插槽
      content = h('div', { class: 'content' }, [this.$slots.default, subContent])
    } else {
      content = h('div', { class: 'content' }, [this.$slots.default])
    }

    // 图标i 要是h标签的子元素，所以要设置参数3
    return h('h' + this.level, {
      class: 'ui header'
    },
    [content])
  }
}
</script>
```

