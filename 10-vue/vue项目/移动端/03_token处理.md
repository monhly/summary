# token 处理

本项目中**有些接口需要权限**才能访问，在前后端分离开发的中项目中权限处理大多是通过token来实现的。

目标：

- 根据接口的要求，给请求添加token
- 把token保存在**vuex**
- 在axios的请求拦截器添加token
- token持久化



## 理解token

什么是 Token？一个“令牌”（一串很长的字符串，由后端生成的），用来请求需要权限的接口用的。

- 它是由后端接口提供的
- 一般在用户登陆时，由后端接口返回
- 在请求某些需要权限的接口时，要把这个token带上。

<img src="asset/image-20200108170328228.png" alt="image-20200108170328228" style="zoom:50%;" />

token就是你家小区的门禁卡。





## 演示token的作用

接着上面的操作去做：当用户登陆成功之后，再去发请求，去求 [接口：获取用户个人信息](http://topline.m.lipengzhou.com/api.html#u83b7u53d6u7528u6237u4e2au4ebau8d44u65990a3ca20id3du83b7u53d6u7528u6237u4e2au4ebau8d44u65993e203ca3e) 。要注意这个接口是明确约定了必须要传递token值的。

我们可以来测试一下这个后果。

### 添加功能

在api/user.js中，根据接口文档的要求，添加一个getInfo功能，用来它去调用接口。

```javascript
// 省略其它
export function getInfo () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get'
  })
}
```



### 调用功能

在src/user/index.vue这个组件去调用getInfo功能，来取用户的信息。

```javascript
import {getInfo } from '@/api/user'

created() {
    getInfo()
}
```

### 测试

此时，点击登陆之后，去请求这个接口，会报错

![image-20200108174349170](asset/image-20200108174349170.png)

### 手动加上token

由于`user/profile`这个接口必须要加上token，我们可以手动去测试一下这个效果。

> 注意下面的token中只是当前调用接口返加的token。
>
> 在你的开发，你要使用从接口中实际返回的token，不要照抄下面的内容。

1. 从登陆成功之后的返回值中复制出来token

![image-20200108174549436](asset/image-20200108174549436.png)

2. 在请求`user/profile`时加上这个token

```javascript
export function getInfo () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzg0ODE5MzAsInVzZXJfaWQiOjEyMTQ4MTQ5MTE4ODQ5NTE1NTIsInJlZnJlc2giOmZhbHNlfQ.xMwv__JJbbATLSaBDbvi6NHieItcann0sir9OAFqK7o'
    }
  })
}
```

- authorzation, Bearer 都是由这个项目的接口要求来定的。



## 把token保存在vuex

为了在任意组件之中都可以方便地使用token值，所以我们把token保存在vuex中。

> vuex就是用来管理公共数据的。

### 设置vuex

在 `store/index.js` 中：

```diff
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存公共数据
    user: null
  },
  mutations: {
    // 补充一个mutation来设置 user
    // vuex中的要求： 只有通过mutation才能去修改state
    setUser (state, obj) {
      state.user = obj
    }
  },
  actions: {
  }
})
```

### 调用mutaion

登录成功以后将数据存储到容器中

在login/index.vue中，修改hLogin的代码：在登陆成功之后，把token保存到vuex中

```javascript
import { mapMutations } from 'vuex'
methods: {
    ...mapMutations(['setUser']),
        async hLogin () {
        
        async hLogin () {
      // 1. 对用户的信息进行验证
      if (!this.checkInfo(this.user)) {
        return
      }

      // 2. loading
      this.$toast.loading({
        message: '登陆中....',
        duration: 0, // 会一直存在,如果有下一个this.$toast被调用，它就会被覆盖，也就消失了
        mask: true // 整体加一个遮罩
      })

      // 3. 调用接口 ,成功失败要给提示
      try {
        // 如果 login这个操作没有错误，则不会进入catch
        const result = await login(this.user)
        // 分析result中的结构，真实数据就是result.data.data
        // console.log(result.data.data)
        this.$toast.success('登陆成功')
        // 1. 保存信息到vuex中user
        // 如何在组件内部去调用mutation?
        // 方式一：this.$store.commit
        // this.$store.commit('setUser', result.data.data)
        // 方式二：mapMutations
        this.setUser(result.data.data)

        // todo : 用户跳转
      } catch (err) {
        // 有错误，就会到这里来
        // err这个错误是 axios给出来了。它表示通过axios发请求时，请求出错了
        // console.dir(err)
        const errMsg = err.response.data.message
        if (errMsg) {
          if (errMsg.mobile) {
            // 说明手机号错误
            this.$toast.fail('手机号错误')
          }
          if (errMsg.code) {
            // 说明手机号错误
            this.$toast.fail('密码错误')
          }
        } else {
          this.$toast.fail('登陆出错')
        }
      }
    }
    }
}
```

### 在user.js中获取token

在普通的模块中获取store中的数据，可以直接`import store from '@/store/index.js'`

```javascript
/**
 * 把所有与用户相关的操作写在这里
 */
import request from '@/utils/request'

// 
import store from '@/store/index.js'
/**
 * 实现用户登陆
 * @param {Object} user
 */
export function login (user) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: user
  })
}

export function getInfo () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get',
    headers: {
+      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

```

上面的做法是在一个具体的方法中添加token，这种做法有问题：

- 对于每一个需要token才能访问的接口，如果都是手动去加，则会有大量重复的操作。（100个接口，就要加100次）

如何在调用接口时，给自动添加token?



## 通过axios拦截器添加token

所有的axios请求在发出来之前都会经过 `请求拦截器`。

```
// 对axios进行二次封装
import axios from 'axios'

// 如何在.js模块中去使用vuex中的数据
import store from '@/store/index.js'

const request = axios.create({
  // 基地址
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器
// 只是axios请求，在发出去之前都要到这里来执行一下
request.interceptors.request.use(function (config) {
  // config这个参数在拦截器工作时，会自动传入值，它的值就是当前请求的配置
  // 如果想在这里加toke，怎么办？
  // 只需给config中的headers中补充一个属性:Authorization: "Bearer XXXXXXXX"
  const user = store.state.user
  // 如果当前有token，就带上
  if (user) {
    console.log('请求拦截器', Date.now())
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  console.dir(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// const request2 = axios.create({
//   // 基地址
//   baseURL: 'http://ttapi.research.itcast.cn/XXXX'
// })

export default request

```

我们可以在这里自动加上token。

- 在获取token要先判断一下，是否有token
- 这里在请求拦截器中设置了token之后，在发所有的请求时，都会自动给加上token.



## token持久化

Vuex 容器中的数据只是为了方便在其他任何地方能方便的获取登录状态数据，但是页面刷新还是会丢失数据状态，所以我们还要把数据进行持久化中以防止页面刷新丢失状态的问题。



> 1. 从login.vue中登陆
>
> 2. 保存token到vuex
>
> 3. 进入user页面，发请求，可以正常携带token，但是如果页面一刷新，则保存在vuex中的数据就会消失，也token也就没有了。



前端持久化常见的方式就是：

- 本地存储(**localstorage**)
- Cookie

上面的两个地方存数据都有一个共同的特点：刷新页面，数据还在！

这里我们以使用本地存储持久化用户状态为例。

基本的思路是：

- 用户登陆成功之后，保存token到本地存储**localstorage**
- 在vuex容器初始化时，使用本地存储中的值

为了操作方便，这里先封装一个用于操作本地存储的存储模块。

### 封装存储模块

创建 `src/utils/storage.js`  文件，实现三个基本的方法实现对localstorage的操作。具体如下：

并写入以下内容

```javascript
// 封装一个模块，来使用localStorage

/**
 * 获取storage
 */
export const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name))
}

/**
 * 设置storage
 * @param {*} name
 * @param {*} data
 */
export const setItem = (name, data) => {
  return localStorage.setItem(name, JSON.stringify(data))
}

/**
 * 删除storage
 * @param {*} name
 */
export const removeItem = (name) => {
  localStorage.removeItem(name)
}

```

### 登录成功，保存token到localstorage

在调用登录接口，登陆成功以后，服务器会返回token信息给我们，我们要做的是将 token 存储到本地存储。在vuex中，

```diff
import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 保存公共数据
    user: null
  },
  mutations: {
    // 补充一个mutation来设置 user
    // vuex中的要求： 只有通过mutation才能去修改state
    setUser (state, obj) {
      state.user = obj

      // 把这个信息做持久化
      setItem('user', obj)
    }
  },
  actions: {
  },
  modules: {
  }
})

```

### 容器初始化去localstorage中取值

最后，在容器中使用本地存储中的数据进行初始化

```diff
import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 保存公共数据
    // vuex的初始值从localStorage中去取
+    user: getItem('user')
  },
  mutations: {
    // 补充一个mutation来设置 user
    // vuex中的要求： 只有通过mutation才能去修改state
    setUser (state, obj) {
      state.user = obj

      // 把这个信息做持久化
      setItem('user', obj)
    }
  },
  actions: {
  },
  modules: {
  }
})

```



## 小结

<img src="asset/image-20200108170023234.png" alt="image-20200108170023234" style="zoom:80%;" />

