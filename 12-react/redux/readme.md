### react-扩展-redux

<img src="assets/image-20200318162458729.png" align="left" alt="image-20200318162458729" style="zoom:50%;" />

#### 01-[redux](https://www.redux.org.cn/)-介绍

> 回忆vue->vuex

1. vuex是专门用于管理复杂vue项目的共享数据
2. vuex是vue的插件
3. 全局`单例`->全局的对象store
5. vuex插件->基于Flux架构模式->vuex是Flux这种思想在vue中的体现

> react->组件通信

1. props
2. props.children
4. 子组件B->提升到父组件->子组件A(兄弟组件=》状态提升)
5. context=>跨多级组件通信

> redux

1. redux是一个通用的前端状态管理库
   * redux和react没有任何直接关系

   * redux可以在jq|vue等项目中使用,也可以在react项目中使用

   * redux基于Flux架构模式的具体产物

   * redux可以用来做统一的数据管理
2. react是用于构建用户页面的js库->从MVC的角度思考->react->View层
3. redux,从MVC的角度思考->Model层->数据层

扩展阅读：[redux官网](https://redux.js.org/introduction/getting-started)    [redux中文网](https://www.redux.org.cn/)    [vuex官网](https://vuex.vuejs.org/zh/guide/)



#### 02-基础-redux-action

> 总结

1. 是store 数据的唯一来源
2. action的使用位置:通过 store.dispatch() 将 action 传到 store -> **建立store和action的联系**
3. Action 本质上是 **JavaScript 普通对象**
4. action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作
5. 除了 type 字段外，action 对象的结构完全由你自己决定
6. action 创建函数是返回一个 action的方法
7. 把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。
8. 将来action创建函数的使用位置是  dispatch(acFn())  ->  待测试->讲完store之后!!!!

> 练习

1. 新建redux-start目录
2. 使用:`npm init -y`，初始化一个package.json文件
3. 安装：`npm install --save redux`
4. 新建index.html页面，从node_modules中引入dist/redux.js文件
5. 创建src目录，新建actions.js文件

```js
// actions.js
// 加减
const ADD = 'ADD', SUB = 'SUB';

// 修改state状态会使用
export function addAction(params) {
  return {
    type: ADD,
    params
  }
}

export function subAction(params) {
  return {
    type: SUB,
    params
  }
}

export { ADD, SUB }
```

`注意` : 

1. 将来action创建函数的使用位置是  dispatch(acfn2())  ->  待测试->讲完store之后!!!!
2. 在浏览器html页面中使用ES6 module 的JS文件时（无打包工具），script标签添加属性 type="module" （支持性：Safari 10.1+，Chrome 61+，Firefox 60+，Edge 16+）

#### 03-基础-redux-reducer

> 总结

1. actions只是提供了方法的列表(相当于书籍的目录)

2. state 存储在单一对象中

3. **reducer**是一个**纯函数**（严格、可控）
* 函数的返回结果只依赖于=》**它自己的参数**
  
* 函数执行过程里面没有**副作用**=》不会修改或者影响外部数据
  
4. **reducer**接收旧的 state 和 action，返回新的 state

5. **reducer**建议(不这样写也不会报错,但是会产生副作用)
   * 不要直接修改形参
   * 不要写API 请求和路由跳转
   * 不要调用非纯函数，如 Date.now() 或 Math.random()

6. **reducer**函数里面根据不同的action类型对state进行不同的处理,并且返回（可以处理多个action）

7. **reducer**拆分=》使每个 reducer 只负责管理全局 state 中它负责的一部分，最后用redux提供的`combineReducers()`方法做合并


```js
// reducers.js
import { ADD, SUB } from "./actions.js";

// 初始值
const initialState = {
  num: 0
}

// reducer：创建store使用
export function numReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD:
      newState.num++
      return newState
    case SUB:
      newState.num--
      return newState
    default:
      return state
  }
}
```



#### 04-基础-redux-store

> 创建store->仓库

1. 提供 getState() 方法获取 state；
2.  提供 dispatch(action) 方法更新 state；
3. 通过 subscribe(listener) 注册监听器;
4. 通过 subscribe(listener) 返回的函数注销监听器。
5. Redux 应用只有一个单一的 store
6. **利用reducer**创建store

```js
// store.js
import { numReducer } from './reducers.js'
import { addAction, subAction } from './actions.js';
const { createStore } = window.Redux;
// console.log(createStore)

// 创建store
const store = createStore(numReducer);
console.log(store, store.getState());
// 监测变化
const sf = store.subscribe(() => {
  console.log('变化了：', store.getState())
})

// 更新state
store.dispatch(addAction());
store.dispatch(addAction());
store.dispatch(addAction());
// 获取state
console.log(store.getState());

// html视图显示
let view = document.getElementById('app'), btn = document.getElementById('btn');
view.innerText = store.getState().num;
btn.onclick = function () {
  // 解除监测
  store.subscribe(sf)
  store.dispatch(subAction());
  view.innerText = store.getState().num;
  console.log(store.getState());
}
```

`注意`: 此时redux和react没任何关系

#### 05-redux-结合react使用

* 之前的store/action/reducer的代码和react没关

* 在react项目中如何使用redux？

> 步骤

1. 脚手架搭建react项目`npx create-react-app redux-in-react`
2. 简化模板
3. 启动项目
4. `npm i redux`
5. index.js ->` import {createStore} from 'redux'`

> 回顾

1. action-> 提供了很多的描述->描述了有事儿发生
2. reducer->函数->接收旧state和action,返回新state
3. store->连接了action和reducer,同时提供的state的初始值

示例代码：

`入口文件：index.js`

```js
import { createStore } from 'redux';
import { numReducer } from './redux/reducers';
// 创建store
const store = createStore(numReducer);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

```

`根组件：App.js`

```js
import { addAction } from './redux/actions';

class App extends React.Component {
  // 组件自己的状态数据
  state = {
    num: 0
  }
  componentDidMount() {
    const { store } = this.props;
    // 监听变化
    this.unsf = store.subscribe(() => {
      console.log('变化了：', store.getState())
      // 变化后更新组件自身状态数据，刷新视图
      this.setState({
        num: store.getState().num
      })
    })
  }

  componentWillUnmount() {
    this.props.store.subscribe(this.unsf)
  }

  render() {
    const { store } = this.props;
    return (
      <div className="App">
        <h1>redux</h1>
        <p>{this.state.num}</p>
        <button onClick={() => {
          store.dispatch(addAction())
        }}>点击</button>
      </div>
    );
  }
}
```


`总结`

1. 入口文件index.js -> 
   1. 创建store
   2. 把store传递给App组件
2. App.js中
   1. 接收props中的store
   2. 导入actions.js
   3. 调用store.dispatch(action)
   4. 使用store.getState()

`注意`

1. react->构建用户页面的js库 -> 写视图的（类组件有自己的state状态）-> 处理View视图
2. redux->专门处理共享数据的->处理state的->处理Model数据模型



#### 06-redux-结合react-异步action-中间件

> 同步 action 创建函数和网络请求结合起来

`actions.js`

```js
// 同步action
export function subAction(params) {
  return {
    type: SUB,
    params
  }
}
// 异步action减一
// redux-thunk处理异步action写法
export function asyncSubAction(params) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(subAction(params))
    }, 1000);
  }
}
```

> 上述代码没问题->但是需要中间件帮你处理代码

1. 安装：`npm i redux-thunk`
2. 在index.js中引入中间件

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let store = createStore(reducerfn, applyMiddleware(thunk))
```

> 总结

1. react->处理视图View
2. redux->处理数据Model
3. 直接在react中使用redux 很麻烦->所以=>
4. 使用react插件react-redux来帮我们简化react中使用redux的操作!



#### 07-案例-react-redux-介绍-安装-案例准备（实际开发使用）

> 刚才的课程重点

1. redux和react没关系
2. redux:action+reducer+store

> redux在react中使用很麻烦->可以**使用react-redux**可以很大的简化在react使用redux

1. 搭建项目
2. 简化模板
3. `npm i react-redux redux`
4. 把`02-其它资源`的src中的文件和模板中的src文件替换
   1. App
      1. Cart->购物车
         1. Item->商品组件
         2. Total->计算总数的组件



注意：之前的所有讲解的代码都不需要掌握!->接下来才是需要掌握的

扩展：[react-redux文档](https://react-redux.js.org/introduction/quick-start)

#### 08-案例-react-redux-使用-配置Provider-store-reducer

> 文件结构

1. src
   1. store目录
      * index.js->返回store

      * reducer.js->返回reducer函数
      * actions.js->后续创建

`store/index.js`

```js
// action|store|reducer写法和之前完全一样->和redux的写法一样
// react-redux->简化使用方式

import { createStore } from 'redux'

import Reducer from './reducers.js'

let store = createStore(Reducer)
export default store

```

`store/reducers.js`

```js
// 初始值
const initialState = {
  // 购物车数据
  num1: 10,
  num2: 20,
  num3: 30
}
const Reducer = (state = initialState, action) => {
  console.log(state) // {num1:10,num2:20,num3:30}->接收改之前的state

  switch (action.type) {
    case 'add':
      return state

    case 'sub':
      return state

    default:
      return state
  }
}

export default Reducer

```

`项目的入口文件index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
// 其实react-redux就是简化了redux的使用方式
// Provider简化了store的用法,包裹在App组件的外层

import store from './store/index.js'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```



#### 09-案例-react-redux-使用-配置connect 显示总数

> 配置connect()和store连接，显示Total.js的总数

```js
import React from 'react'
import { connect } from 'react-redux'

class Total extends React.Component {
  render() {
    const { sum } = this.props;
    return <div>商品总数：【{sum}】</div>
  }
}
// 回调函数
const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
  return {
    sum: Object.values(state).reduce((p, n) => p + n)
  }
}

export default connect(
  mapStateToProps
)(Total)
```

> mapStateToProps()方法说明

1. 形参1: store的state
2. 形参2: 当前组件的props=>{}
3. return {要添加的新属性:值}

> connect()方法说明

1. connect是方法,实参1要mapStateToProps
   ` connect(mapStateToProps)`

2. connect() return一个新方法
   `connect(mapStateToProps)()`

3. connect()()是一个高阶组件
   ` let Total1 = connect(mapStateToProps)(Total)`
   ` export default Total1`



#### 10-案例-react-redux-使用-配置connect-显示商品名称和数量

> 接收外部传入的商品名称属性：pname，根据pname获取对应的商品数量

`Item.js`

```js
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps) // {pname:num123}
  // console.log(state) // {num1:10,num2:20,num3:30}
  const num = state[ownProps.pname];
  return {
    num
  }
}

export default connect(mapStateToProps)(Item)

```



#### 11-案例-react-redux-使用-修改数量-connect-dispatch-action

> 使用connect方法的第二个参数，传递修改state的方法（dispatch）

`actions.js`

```js
// Actions
const ADD = 'ADD', SUB = 'SUB';

// 修改状态会使用
export function addAction(pname) {
  return {
    type: ADD,
    pname
  }
}

export function subAction(pname) {
  return {
    type: SUB,
    pname
  }
}
```

`reducers.js`

```js
import { ADD, SUB } from "./actions.js";

// 初始值
const initialState = {
  num1: 10,
  num2: 20,
  num3: 30
}

// reducer：创建store使用
export function numReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD:
      newState[action.pname]++
      return newState
    case SUB:
      newState[action.pname]--
      return newState
    default:
      return state
  }
}
```

`Item.js`

```js
import React from 'react'
import { connect } from 'react-redux'
import { addAction, subAction } from '../store/actions';

class Item extends React.Component {
  render() {
    const { num, pname, add, sub } = this.props;
    console.log(this.props)
    return (
      <div>
        <button onClick={() => { add() }}>+</button>
        <button onClick={() => { sub() }}>-</button>
        <span>【商品名】{pname} 商品的数量【{num}】</span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const num = state[ownProps.pname];
  return {
    num
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(dispatch, ownProps)
  return {
    add: () => {
      dispatch(addAction(ownProps.pname))
    },
    sub: () => {
      dispatch(subAction(ownProps.pname))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)

```

#### 12 总结

1. react->UI->视图View
2. redux->数据store|action|reducer

   * action: 描述获取或者操作数据的行为（要针对store干什么=》发号施令）

   * reducer：操作store里的数据（可以定义store默认数据）=> 干活的

   * store: 提供了共享数据和操作共享数据的方法 =》把reducer和action 建立联系=》dispatch(addAction(params)) => reducer(state, action)

<img src="assets/redux-%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="redux-流程图" style="zoom:48%;" />



3. react-redux->连接react视图和redux数据的桥梁-> Provider&connect

```js
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
```

