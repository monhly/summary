### 基础配置

#### 01-配置全局样式

> 创建全局样式index.css

1. 自定义公共样式` index.css`
3. 入口文件`index.js`中引入

`index.css`

```css
html,
body {
    height: 100%;
    color: #333;
    background: #fff;
}

h1,
h2,
h3,
p,
ul,
dd {
  margin: 0;
  padding:0;
}

ul,li {    
    list-style: none;
}

* {
    // touch-action: pan-y;
    box-sizing: border-box; 
}
```

`提示`: 

样式是全局的-> 优先级低于组件自己的样式



#### 02-ant组件库基本使用

> `ant-design` 设计规范，ant-design-mobile基于它实现

1. 安装：`npm i antd-mobile`
2. 在App.js中导入组件库
3. 在index.js中导入antd-mobile的样式文件
4. 使用组件测试

扩展阅读：[组件库文档](https://mobile.ant.design/index-cn)

#### 扩展-按需加载ant组件库（了解）

目的：只加载当前页面里边用到的组件和样式

分析打包文件大小：xx.chunk.js（例如：/antd-mobile/xxx组件）

配置：

1. 引入 [react-app-rewired](https://github.com/timarney/react-app-rewired) 并修改 package.json 里的启动配置

 ```bash
npm install react-app-rewired customize-cra --save-dev
 ```

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
}
```

2. 然后在项目根目录创建一个config-overrides.js 用于修改webpack默认配置。

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

3. 使用 babel-plugin-import, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 config-overrides.js 文件。

```bash
npm install babel-plugin-import --save-dev
```

```js
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);
```

注意：

1. json文件里边不能有注释
2. 删除入口文件中ant组件库样式引用

#### 03-配置路由-一级路由

`安装`：`npm i react-router-dom`

`配置` : 在App.js中配置路由 （测试和回顾）

`目的：`

1. 新建Home、CityList、Map组件
2. 配置一级路由`/home`、`/cityList`、`/map`
3. 配置404页面

```js
// 根组件
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/cityList" component={CityList} />

          {/* 404页面 */}
          <Route component={Fn404} />
        </Switch>
      </div>
    </Router>
  );
}
```



#### 04-配置路由-嵌套路由-二级路由

`目的`: 在Home组件中配置=》默认首页、找房、我的=〉3个二级路由

> 在对应的一级路由组件中配置二级路由

`结构`

```json
Home(首页)
   1. Index 默认
   2. House 房屋
   3. Profile 我的(个人中心)
```

`代码`-> Home/index.js

```html
import React from 'react'

import { Link, Route } from 'react-router-dom'

import Index from '../Index'
import House from '../House'
import Profile from '../Profile'

class HomeIndex extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        <div>
          <Link to="/home">首页</Link>
          <Link to="/home/house">房屋列表</Link>
          <Link to="/home/profile">个人中心</Link>
        </div>
      </div>
    )
  }
}
export default HomeIndex

```



`提示`: 整个项目<Router>只有一个 在App中!!

#### 05-配置路由-首页重定向

`目的`: 当path是`/`时，显示`/home`下默认首页->此时用重定向

`提示`

1. Route的属性render
2. render要求是return React元素的方法)（Redirect组件）
3. 当组件的显示有前提条件时, 此时不用component属性,而用render

```js
<Router>
      <div className="app">
        {/* <Button type="primary">按钮</Button> */}
        {/* <Link to="/home">首页</Link>
        <Link to="/cityList">城市选择</Link> */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        {/* <Route path="/cityList" component={CityList} /> */}
      </div>
 </Router>
```

注意：路由默认匹配模式是模糊匹配，需要添加属性`exact`变为精确匹配

