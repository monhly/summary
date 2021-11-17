## VUE项目-黑马头条PC端-day02

### 01-每日反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 关于做项目的套路，比如登录模块的基础布局环节或绘制表单环节，看老师的笔记有点思路，关闭笔记自己一写就废了。现在照着笔记敲或者找笔记上去拷贝，对自己的锻炼程度又不大。最近学习效率有点低，老师可否有啥好的练习建议给我们。 |
| ***  | 只需要在main. js中导入element-ui，其他组件里面就都可以用吗？ |
| ***  | 二级路由那里 有点不够清晰 和 前几天做的 英雄列表的 左面 侧边栏 有什么区别? 为什么 这次页面会有二级路由 |

- 自己独立完成业务的能力是需要时间经验积累。
- 老师通过项目运用知识来解决问题的思路，实现套路。
- 建议：
  - 上课一定要认真听，尽可能别开小差，完整的听下去。
  - 尝试自己独立的完成当日的内容。
  - 从笔记当中尝试找到解决问题的方法，去回顾上课的视频在视频寻找答案。
  - 挤挤时间，自己独立来一遍。



全局使用饿了么UI的组件原因：

第一：`import ElementUI from 'element-ui'`    

第二：`Vue.use(ElementUI )`   // 使用插件（饿了么UI是vue插件形态存在）

- use背后使用插件，插件内容往Vue上进行了全局组件的注册。



### 02-登录模块-表单元素校验

> 表单组件由饿了么UI组件库提供，思考它有没有提供校验功能。

> 在文档当中找到一个表单验证的例子，分析其实现功能的代码。

提取对我们有用的信息点：

-  Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。 
- 大白话来解释：
  - el-form组件------->rules属性--------->约定的校验规则（data定义对象）
  - el-form-item组件---------->prop属性--------->需要校验的字段名称（规则对象属性名称===绑定表单数据对象的属性名称一致）
  - el-from组件------->model属性--------->绑定表单数据对象

```html
<el-form :model="form" :rules="rules">
	<el-form-item prop="name">
  	<el-input v-model="form.name"></el-input>
  </el-form-item>
</el-form>
<script>
export default {
  data () {
    return {
      // 表数据对象
      form: {
        name: ''
      },
      // 校验规则对象
      rules: {
        name: [
          { required: true, message:'请输入名字', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
```



落地代码：

```diff
      <!-- 表单 -->
+      <el-form :model="loginForm" :rules="loginRules">
+        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
+        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
```

```js
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' } // 必填
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }, // 必填
          { len: 6, message: '验证码6个字符', trigger: 'blur' } // 长度是6
        ]
      }
```





###03-登录模块-自定义校验

> 饿了么UI组件提供的校验规则是有限，需要自己来实现校验，查看文档如何自定义校验规则。

- 反馈图标  `<el-from status-icon>`

从文档中得到有用的信息：

- 在校验规则对象中， validator 属性来配置自定义校验规则。
- 这个属性对应的是，校验规则函数（这个函数要先声明后使用）
- 在 data(){} 的return之前来定义自定义校验函数
- 自定义校验函数规则：
  - 一定有三个传参   rule, value, callback
    - rule 当前字段校验规则对象，一般不使用
    - value 当前字段对应的数据，被校验的数据
    - callback 回调函数，当校验完毕后一定调用函数。
      - 如果成功：callback()
      - 如果失败：callback(new Error(‘错误信息|表单下提示信息’))





根据得到的信息落地代码：

定义校验函数：

```diff
  data () {
+    // 自定义校验函数
+    const checkMobile = (rule, value, callback) => {
+      // 校验value的值，它必须符合手机格式
+      // 格式：1 开头，第二个数字 3-9 之间，9个数字结尾
+      if (/^1[3-9]\d{9}$/.test(value)) {
+        callback()
+      } else {
+        callback(new Error('手机号格式不对'))
+      }
+    }
    return {
```

使用校验函数：

```diff
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, // 必填
+          // 指定一个自定义校验函数，失去焦点后触发。
+          { validator: checkMobile, trigger: 'blur' }
        ],
```





### 04-登录模块-整体表单校验

> 当用户直接点击登录的时候，需要对整体表单所有元素进行校验。

从文档中得到有用的信息：

- el-form组件提供了一个函数： validate 
- 往函数传参传递的是一个回调函数：validate((valid)=>{ // 校验完毕后执行 })
- 回调函数中有一个参数：valid 作用是表示表单是否校验成功 

如何调用一个组件的函数：

- 通过组件的实例，就可以调用组件的函数。
- ref属性，标识的是一个普通标签将来就是获取dom，标识的是一个组件将来就是组件实例



落地代码：

- 绑定事件

```html
        <el-form-item>
          <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
```

- 处理函数

```js
  methods: {
    // 登录函数
    login () {
      // 登录前，对整体表单进行校验
      // this.$refs.loginForm  就是组件实例
      this.$refs.loginForm.validate(valid => {
        // valid 代表整体表单是否校验成功
        if (valid) {
          // 校验成功，进行登录
          console.log('进行登录')
        }
      })
    }
  }
```

- 给组件加 ref 标识

```html
 <el-form ref="loginForm"
```



### 05-登录模块-粗暴登录

> 发送手机号和验证码，提交给后台进行校验，如果成功跳转首页，提示错误信息即可。

> 短信验证码后台没有提供，但是给了一个万能的短信验证码：246810，还有测试账号：13911111111



1、配置axios来发请求：

`src/api/index.js`

```js
// 导出配置好的axios提供给main.js去使用
import axios from 'axios'

// 进行axios的配置，将来这回又很多axios相关的配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

export default axios
```

`src/main.js` 进行挂载

```js
// 导入配置好的axios
// 完整路径：./api/index.js
// 简写  ./api  index.js是默认索引文件可以省略
// 使用相对路径要根据目录结构进行书写，如果目录结构一旦发生改变，线路路径的层级也会改变。
// 使用绝对路径就没问题，@ 代表src的绝对路径。补充：vue-cli下才可使用。
import axios from '@/api'

// 挂载axios
Vue.prototype.$http = axios
```

2、阅读接口文档得到：

- 请求方式 post
- 请求地址 authorizations
- 传递参数 {mobile,code}
- 返回数据（含义）
  - 用户相关信息

3、发起登录请求，完成登录逻辑：

```diff
        if (valid) {
          // 校验成功，进行登录
-          // console.log('进行登录')
+          this.$http.post('authorizations', this.loginForm).then(res => {
+            // 登录成功
+            this.$router.push('/')
+          }).catch(() => {
+            // 错误提示
+            this.$message.error('手机号或验证码错误')
+          })
        }
```





### 06-首页模块-路由与组件

创建首页组件：`src/views/Home.vue`

```html
<template>
  <div class='home-container'>
    Home
  </div>
</template>

<script>
export default {
  name: 'my-home'
}
</script>

<style scoped lang='less'></style>
```

配置路由规则：`src/router/index.js`

```js
import Home from '../views/Home.vue'
```

```diff
// 声明路由规则
const routes = [
  // 登录
  { path: '/login', component: Login },
  // 首页
+  { path: '/', component: Home }
]
```



### 07-首页模块-基础布局

分析布局结构：

- 全屏容器
  - 侧边栏
  - 右侧主体
    - 头部内容
    - 主体内容

使用布局容器组件实现基础布局：

```html
<template>
  <!-- 全屏容器 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 头部内容 -->
      <el-header class="my-header">Header</el-header>
      <!-- 主体内容 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'my-home'
}
</script>

<style scoped lang='less'>
.home-container{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background: #002244;
  }
  .my-header{
    border-bottom: 1px solid #ddd;
  }
}
</style>

```





### 08-首页模块-头部内容

头部内容布局：

- 左侧
  - 字体图标  +  文字
- 右侧
  - 下拉菜单组件 + 默认显示（头像+用户名称）



结构：

```html
      <!-- 头部内容 -->
      <el-header class="my-header">
        <!-- 图标 -->
        <span class="el-icon-s-fold icon"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="user-avatar" src="../assets/avatar.jpg">
            <!-- 名字 -->
            <span class="user-name">张三丰</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
```

样式：

```less
.my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      .user-avatar{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name{
        font-weight: bold;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
```



###09-首页模块-侧边栏

侧边栏布局：

- 顶部LOGO
- 导航菜单组件



顶部LOGO：

```diff
    <!-- 侧边栏 -->
    <el-aside class="my-aside" width="200px">
      <!-- logo -->
+      <div class="logo"></div>
      <!-- 导航菜单 -->
    </el-aside>
```

```less
  .my-aside {
    background: #002233;
    .logo{
      width: 100%;
      height: 60px;
      background: #002244 url(../assets/logo_admin.png) no-repeat center / 140px auto;
    }
  }
```



导航菜单组件(分析)

```html
<!-- el-menu 导航菜单容器 -->
<!-- default-active="2" 默认被激活的菜单项，index的属性值是2的那个菜单项被默认激活 -->
<!-- class="el-menu-vertical-demo" 可有可无，写样式的 -->
<!-- @open="handleOpen" 打开子菜单 @close="handleClose"  关闭子菜单   -->
<!-- background-color="#545c64" 导航菜单背景颜色 -->
<!-- text-color="#fff" 导航菜单字体颜色 -->
<!-- active-text-color="#ffd04b" 菜单被激活字体颜色 -->
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- el-submenu 拥有子菜单的菜单项 -->
  		<!-- 普通菜单项（没子菜单的） -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
```



导航菜单组件(使用)

```html
<!-- 导航菜单 -->
      <el-menu
      style="border-right:none"
      default-active="1"
      background-color="#002233"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
```





### 10-首页模块-欢迎组件

首先：准备欢迎组件 `src/views/Welcome.vue`

```html
<template>
  <div class='welcome-container'>
    <img src="../assets/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'my-welcome'
}
</script>

<style scoped lang='less'>
.welcome-container{
  text-align: center;
  padding-top: 50px;
}
</style>

```

然后：`src/router/index.js` 配置属于首页路由下的二级路由规则，去指向这个欢迎组件。

```js
import Welcome from '../views/Welcome.vue'
```

```js
  // 首页
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Welcome }
    ]
  }
```

最后：`src/views/Home.vue` el-main容器内准备，显示二级路由对应组件的容器。

```html
      <!-- 主体内容 -->
      <el-main>
        <!-- 二级路由对应组件显示的容器 -->
        <router-view></router-view>
      </el-main>
```



















