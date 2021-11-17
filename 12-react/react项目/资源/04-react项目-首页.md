### 首页

#### 01-首页-轮播图-配置

> 使用ant的Carousel 轮播图组件

目录：`pages/Index/index.js`

```html
  // 渲染轮播图
  renderCarousel = () => {
    return (
      <Carousel
        autoplay={true}
        infinite
      >
        {this.state.data.map(val => (
          <a
            key={val}
            href="http://www.itheima.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, background: '#fff' }}
          >
            <img
              src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // 屏幕适配
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
```

`注意`

1. onload 事件 -> 加载完毕触发
2. resize事件->window窗口尺寸变化时触发
3. 通过resize和onload的设置完成了图片的动态高度->图片适配
4. imgHeight 默认高度176->目的是图片加载完之前 占位->防止布局错乱



#### 02-首页-轮播图-请求数据并渲染

`目的`: 发送网络请求获取图片数据=》给轮播图

> 回顾axios用法

1. **安装axios**：`npm i axios`
2. 引入`import axios from 'axios';`
3. **使用 axios.get**
4. 看[接口文档](http://localhost:8080/#/home/get_home_swiper)（线上地址：http://api-haoke-dev.itheima.net）
   1. 接口说明(请求方式和路径,请求和响应.参数)
   2. 测试接口->postman
5. cdm->发送请求
6. **设置state**->给轮播图数据

`注意`: res.data.body返回的数据中包含图片的路径->   src={`http://localhost:8080${item.imgSrc}`} 

#### 扩展-axios全局配置和拦截器封装

> 创建axios单例模式（只new了一次），修改基础配置

目录：`utils/axios.js`

步骤：

1. 导入axios
2. 创建axios实例，配置基础URL、请求头等
3. 注册实例的拦截器请求钩子函数
4. 导出创建好的axios实例和接口基础URL（BASE_URL）

```js
import axios from 'axios'

// 后台接口的基础地址
const BASE_URL = 'http://localhost:8080';
// 创建axios的实例
const instance = axios.create({
  baseURL: BASE_URL
});

// 注册拦截器（request和response）

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default instance

```



#### 扩展-axios拦截器->简化和统一response返回数据格式

步骤：

1. 在instance.interceptors.response.use回调函数中处理数据
2. 返回需要的数据

```js
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const data = {
    status: response.data.status,
    description: response.data.description,
    data: response.data.body
  }
  return data;
},...
```



#### 扩展-axios拦截器->全局请求的开始和关闭动画

> 使用ant的Toast组件，在全局utils/axios.js=》拦截器中添加loading效果

```js
import { Toast } from 'antd-mobile'
// 请求拦截器
    Toast.loading('加载中...', 0)
// 响应拦截器
    Toast.hide()
```



#### 扩展-组件的axios请求代码提取到api目录

目的：为了方便管理和维护项目的接口请求方法。

在`utils/api`下：

把项目的所有请求=》**根据业务模块划分**=>到不同的文件中管理。

```js
import axios from '../axios';

/**
 * home接口
 */
// 获取轮播图数据
export function getSwiper() {
  return axios.get('/home/swiper')
}
```



#### 03-首页-轮播图-自动播放问题解决

`问题`

1. **刷新后, 轮播图无法自动播放**

   > 原因分析

   1. 图片加载前-> autoplay={true}
   2. **为true时, 还没有图片**-> 自动播放失效

   > 解决方案

   1. 需求: 控制视图变化->通过数据控制视图->提供state数据
   2. autoplay={this.state.autoplay}
   3. 图片加载完毕-> 改autoplay为true

2. **触碰轮播图-> 就警告**

   > 原因分析

   ```wiki
   Unable to preventDefault inside passive event listener due to target being treated as passive.
   ```

   * 浏览器必须要在执行事件处理函数之后，才能知道有没有调用过 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟。

   * 为了让页面滚动的效果如丝般顺滑，从 **chrome56** 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove 事件处理函数，会默认为是 passive: true。**浏览器忽略 preventDefault()** 就可以第一时间滚动了。
     `wnidow.addEventListener('touchmove', func, { passive: true })`

   > 解决方案

   全局样式：`index.css`

   ```css
   * {
       touch-action: pan-y;
   }
   ```



#### 04-首页-栏目导航-布局-调整样式

> 使用ant的Flex布局组件

1. 使用`02-其它资源/images`图片
2. 配置栏目数据和导入图片文件`import Nav1 from '../../assets/images/nav-1.png'`
3. 新建样式文件`index.css`
4. 使用**Flex布局组件**
5. 遍历栏目数据
6. 调整栏目样式

* 栏目数据

```js
// 首页栏目导航的数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/house'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/house'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]
```

* 栏目jsx和样式

```css
// JSX
<Flex className="nav">
	<Flex.Item onClick={() =>} key={id}>
      <img src={img} />
      <p>{title}</p>
    </Flex.Item>
</Flex>

/* 菜单样式 */
.nav {
    padding-top:13px;
    text-align: center;
    background-color: #fff;
}

.nav img {
    height: 48px;
}

.nav p {
   	margin: 8px 0 10px;
    font-size: 13px;
}
```



#### 05-首页-栏目导航-路由功能

> 添加事件，跳转路由

1. 通过props.history.push方法跳转路由
2. 拆分栏目导航的`navs`数据，到utils下`navs.js`

```js
// 导入栏目导航的数据
import navs from '../../utils/navs';
// 渲染栏目
renderNavs = () => {
    return navs.map((item) => <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
      <img src={item.img} />
      <p>{item.title}</p>
    </Flex.Item>)
}
```



#### 06-首页-租房小组-标题布局

> 使用准备好的结构和样式，这里样式使用的sass

扩展阅读：[sass文档](https://www.sass.hk/docs/)


1. 安装：`npm i node-sass`
2. 新建.scss文件
   1. 原来的css代码
   2. sass语法 -> &取上一级选择器名字
3. 导入 `import './index.scss`

* 结构和样式

```html

```

```js
// 租房小组
.group {
    overflow: hidden;
    padding: 0 10px;
    &-title {
        margin: 15px 0 15px 10px;
        h3 {
            font-size: 15px;
        }
        span {
            font-size: 14px;
            color: #787d82;
        }
    }
}
```

注意：修改其它地方的css文件格式为scss

#### 07-首页-租房小组-宫格布局

> 使用ant的Grid组件

1. 分析和使用Grid组件
2. 调用接口获取租房小组数据
3. 遍历数据，使用准备好的item 结构，渲染Grid

```jsx
<Grid
      data={this.state.groups}
      columnNum={2}
      // 关闭默认正方形
      square={false}
      hasLine={false}
      renderItem={item => {
          return (
            // item结构
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>
          )
  }}
  />
```

* 宫格样式

```scss
// 租房小组
.group {
    overflow: hidden;
    padding: 0 10px;
    &-title {
        margin: 15px 0 15px 10px;
        h3 {
            font-size: 15px;
        }
        span {
            font-size: 14px;
            color: #787d82;
        }
    }
    // 宫格
    .am-flexbox {
        margin-bottom: 10px;
        background-color: transparent;
        .am-grid-item {
            margin-right: 0;
            background-color: #fff;
            &:first-child {
                margin-right: 10px;
            }
        }
    }
    .grid-item {
        padding: 0 13px;
        .desc {
            h3 {
                margin-bottom: 5px;
                font-size: 13px;
            }
            p {
                color: #999;
                font-size: 12px;
            }
        }
        img {
            width: 55px;
        }
    }
}
```



#### 08-首页-最新资讯

`目的：`把精力放在业务上 ,这里将使用最新资讯的准备布局和样式

1. 发送请求获取news数据
2. 使用map遍历元素

* Jsx结构

```js
{/* 最新资讯 */}
<div className="news">
  <h3 className="group-title">最新资讯</h3>
  <WingBlank size="md">{this.renderNews()}</WingBlank>
</div>
```

* 渲染新闻列表js方法

```js
  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
```

* css样式

```css
// 最新资讯
.news {
    padding: 10px;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 50px;
    .group-title {
      margin: 10px 0 5px 10px;
      font-size: 15px;
    }
    &-item {
      height: 120px;
      padding: 15px 10px 15px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    &-item:last-child {
      border: 0;
    }
    .imgwrap {
      float: left;
      height: 90px;
      width: 120px;
    }
    .img {
      height: 90px;
      width: 120px;
    }
    .content {
      overflow: hidden;
      height: 100%;
      padding-left: 12px;
    }
    .title {
      margin: 0;
      font-size: 14px;
    }
    .info {
      width: 100%;
      color: #9c9fa1;
      font-size: 12px;
    }
    .message-title {
      margin-bottom: 48px;
    }
  }
```



#### 扩展-首页-接口请求-Promise重构

`目的`: 简化发送请求的重复代码

> 使用Promise.all方法，传入一个包含多个Promise对象的数组，返回resolve结果数据

```js
  loadDatas = async () => {
    const apis = [getSwiper(), getGroup(), getNews()];
    let res = await Promise.all(apis);
    console.log('all datas:', res);
    this.setState({
      swiper: res[0].data,
      group: res[1].data,
      news: res[2].data
    }, () => {
      this.setState({
        aplay: true
      })
    })
  }
```



#### 09-首页-顶部导航和搜索-布局-路由

> 使用准备好的结构和样式，实现城市列表和地图找房页面跳转

1. 点击左侧：显示城市列表（将来是根据定位城市进行动态渲染）

2. 点击右侧：显示地图找房

   

> 引入：ant的`SearchBar`组件，设置state：keyword

渲染顶部的js方法：

```js
  // 渲染顶部导航
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city">
            北京<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map">
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }
```

样式css：

```css
// 顶部导航和搜索
.topNav {
  position: fixed;
  top:20px;
  left:0;
  right:0;
  z-index: 999;
  width: 100%;
  padding:0 10px;
  .searchBox {
    flex:9;
  }
.city {
  position: absolute;
  left:20px;
  top:10px;
  z-index: 100;
  padding-right: 8px;
  border-right: 1px solid #eee;
  // 动画文字抖动解决
  backface-visibility: hidden;
  .icon-arrow {
    color:#7f7f80;
    vertical-align: middle;
    font-size: 12px;
  }
}
.am-search {
  padding: 0 8px 0 50px;
  height: 36px;
  overflow: hidden;
 
  border-radius: 100px;
}
.am-search-input,.am-search {
  background-color: #fafafa;
}
.map {
  flex:1;
  text-align: right;
  .icon-map {
    font-size: 24px;
  }
}

}
```



#### 10-首页-百度地图API-介绍-使用

`目的：`了解百度地图的API3.0版本-[文档](http://lbsyun.baidu.com)，**显示hello world示例效果**

目录：`pages/Map/index.js`组件中开发

`AK` : 3wMn1moaPP37Rc5g6v61DGZrXHDlUazS

1. 申请账号 (百度网盘/知道)
2. 创建应用->**获取AK**
3. public/index.html 引入百度地图cdn
4. 提供百度地图的容器(需要给高度->html,body,root,app->container->height:100%)
5. 百度地图helloWorld 显示成功

```js
// 初始化地图
initMap = () => {
  const { BMap } = window;
  // console.log(BMap)
  // 1. 创建地图实例
  const map = new BMap.Map("container");
  // 2. 地图定位的经纬度设置(天安门)
  let point = new BMap.Point(116.404, 39.915);
  // 3. 设置地图的位置和缩放级别
  map.centerAndZoom(point, 15);
}
```

```css
// 全局样式
#root,.app {
height: 100%;
}
// Map组件样式
.mapBox,#container {
height: 100%;
}
```



注意：组件中BMap需要通过window解构获取

#### 11-首页-百度地图-导航返回

> 使用ant的NavBar组件从地图页面返回

```jsx
<NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => {
            this.props.history.goBack()
            }}
        >
        地图找房
</NavBar>
```

注意：处理地图的滚动条=》父元素减去navbar组件的高度

#### 12-首页-百度地图-定位当前城市

> 看文档，使用IP定位方法获取当前城市，显示到首页搜索栏左侧

1. 使用百度地图提供的**LocalCity方法**根据IP地址获取当前位置信息

2. 调用接口获取当前位置的城市信息（**包含城市名和ID**）

百度地图-定位：[文档](http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/geolocation) 

```js
// 状态数据
state = {
      currCity: {
      label: '--',
      value: ''
    }
}  

// 获取当前城市信息
  getCurrCity = () => {
    // 使用百度地图LocalCity类获取当前城市名字
    const myCity = new window.BMap.LocalCity();
    myCity.get(async (result) => {
      // 根据百度地图获取到城市名字，调用后台接口获取当前城市的详细数据
      let res = await getCityInfo(result.name);
      console.log(res);
      // 显示到页面上
      res.status === 200 && this.setState({
        currCity: res.data
      })
    });
  }

```

#### 13-总结

