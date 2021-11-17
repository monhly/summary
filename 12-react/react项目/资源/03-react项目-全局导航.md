### 全局导航

#### 01-底部Tabbar-基本配置

目录：`Home/index.js`

> 使用ant的Tabbar组件

`提示`

1. 复制代码(标签+js方法+state数据)
2. 执行
3. 分析属性 
4. 调整自己的样式

#### 02-底部Tabbar-调整位置-字体图标

> 调整样式和替换图标

1. tabbar固定底部,home下新建

   * index.css

   ```css
   .barBox {
     position: fixed;
     width: 100%;
     bottom: 0;
   }
   
   .barBox .iconfont {
     font-size: 24px;
   }
   ```

2. 使用自己的字体图标（使用`02-其它资源/素材/fonts`准备好的字体图标）

图标类名：icon-ind、icon-findHouse、 icon-my

* assets/fonts/

* 入口文件index.js->引入fonts样式

* icon={<i className="iconfont icon-ind"/>}

```jsx
      <div>
        {/* <Link to="/home/index">首页</Link>
        <Link to="/home/house">找房</Link>
       <Link to="/home/profile">我的</Link> */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        <div className="barBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            noRenderContent={true}
          >
       <TabBar.Item
              title="首页"
              key="Life"
              icon={
                <i className="iconfont icon-ind" />
              }
              selectedIcon={<i className="iconfont icon-ind" />
              }
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
            />
            
            <TabBar.Item
              icon={
                <i className="iconfont icon-findHouse" />
              }
              selectedIcon={
                <i className="iconfont icon-findHouse" />
              }
              title="找房"
              key="Koubei"

              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}

            />

            <TabBar.Item
              icon={
                <i className="iconfont icon-my" />
              }
              selectedIcon={
                <i className="iconfont icon-my" />
              }
              title="我的"
              key="Friend"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            />
          </TabBar>
        </div >
      </div>
```



#### 03-底部Tabbar-路由功能

`目的`: 让TabBar具有Link的作用

1. onPress 编程式导航
2. 去掉TabBar的自带内容 ->去掉renderContent()方法
3. 设置了selected , selectedTab  的值为**当前路由的path**
4. 把selectedTab默认值改为当前url参数 -> this.props.location.pathname

```js
  onPress={() => {
    this.props.history.push('/home/index')
    this.setState({
      selectedTab: '/home/index'
    })
  }}
```



#### 04-底部Tabbar-重构（再优化）

`目的`: 把之前TabBar重复的代码进行简化->利用map方法

1. 找重复代码
2. 提供数据数组(接口||自己设计)
3. map->把数据数组变成模板数组
4. 调用模板

`说明`: 企业开发 重构项目很常见

```js
// TabBar 数据
const tabItems = [
  {
    title: '首页',
    path: '/home',
    icon: 'icon-ind'
  },
  {
    title: '找房',
    path: '/home/house',
    icon: 'icon-findHouse'
  },
  {
    title: '我的',
    path: '/home/profile',
    icon: 'icon-my'
  },
]

 // 根据菜单配置渲染tabBar的items
  renderTabBarItems = () => {
    return tabBarData.map((item) => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.path}
          icon={
            <i className={`iconfont ${item.icon}`} />
          }
          selectedIcon={<i className={`iconfont ${item.icon}`} />}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.props.history.push(item.path);
            this.setState({
              selectedTab: item.path,
            });
          }}
        />
      )
    })
  }
```

#### 05-总结