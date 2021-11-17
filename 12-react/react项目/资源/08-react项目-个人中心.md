### 个人中心

#### 01-我的-展示

`目的：`把准备好的个人中心(我的)进行展示（`02-其它资源/准备组件/Profile`）

`相关业务：`

1. 保存登录用户token -> 已完成
2. 房屋详情中的收藏按钮->已提供
3. 个人中心里面的我的收藏按钮->已提供
4. 个人中心->去登录按钮->/login->已完成
5. **功能1:** 收藏房源->**未完成**
6. **功能2:** 根据用户是否登录->显示游客或者登录人信息->**未完成**



#### 02-我的-持久化token（JWT-json web token）

`目的`: 将保存/获取/移除token的方法进行单独封装在`utils/index.js`

```js
const TOKEN = 'hkzf_token'
// 获取
const getToken = () => localStorage.getItem(TOKEN)
// 设置
const setToken = val => localStorage.setItem(TOKEN, val)
// 删除
const removeToken = () => localStorage.removeItem(TOKEN)
// 是否登录判断：boolean
const isAuth = () => !!getToken()
// 导出
export { getToken, setToken, removeToken, isAuth }

```

注意：处理Login中设置token的方法

#### 03-我的-展示个人信息

`目的：` 根据是否有token,发送请求获取用户信息进行展示

`步骤：`

1. 在 state 中添加两个状态：isLogin（是否登录） 和 userInfo（用户信息）。
2. 导入 **isAuth**（登录状态）、getToken（获取token）。
3. 创建方法 getUserInfo，用来获取个人资料。 
4. 在方法中，通过 isLogin 判断用户是否登录。
5. 如果没有登录，则不发送请求，渲染未登录信息。
6. **如果已登录**，就根据接口发送请求，获取用户个人资料。 
7. **渲染个人资料数数据**

```js
// 设置状态数据
state = {
  isLogin: isAuth(),
  userInfo: {}
}

// 获取用户数据 
getUserInfo = async () => {
    const { isLogin } = this.state;
    if (isLogin) {
      let res = await getUserInfo(getToken())
      console.log(res);
      if (res.status === 200) {
        // 处理图片路径
        res.data.avatar = BASE_URL + res.data.avatar;
        this.setState({
          userInfo: res.data
        })
      } else {
        Toast.info(res.description)
      }
    }
  }

  // 渲染用户信息
  renderUser() {
    const { history } = this.props;
    const { userInfo: { nickname, avatar } } = this.state;
    return (<div className={styles.title}>
      <img
        className={styles.bg}
        src={BASE_URL + '/img/profile/bg.png'}
        alt="背景图"
      />
      <div className={styles.info}>
        <div className={styles.myIcon}>
          <img className={styles.avatar} src={avatar || DEFAULT_AVATAR} alt="icon" />
        </div>
        <div className={styles.user}>
          <div className={styles.name}>{nickname || '游客'}</div>
          {
            this.state.isLogin ? (
              <>
                <div className={styles.auth}>
                  <span onClick={this.logout}>退出</span>
                </div>
                <div className={styles.edit}>
                  编辑个人资料
    <span className={styles.arrow}>
                    <i className="iconfont icon-arrow" />
                  </span>
                </div>
              </>) : (<div className={styles.edit}>
                <Button
                  type="primary"
                  size="small"
                  inline
                  onClick={() => history.push('/login')}
                >
                  去登录
              </Button>
              </div>)
          }
        </div>
      </div>
    </div>)
  }
```

#### 04-我的-退出

`目的：`登录后=》点击退出按钮,退出登录

`步骤：`

1. 给退出按钮绑定单击事件，创建方法 logout 作为事件处理程序。
2. 导入ant的 Modal 对话框组件。 
3. 在方法中，拷贝 Modal 组件文档中确认对话框的示例代码。 
4. 修改对话框的文字提示。 
5. 在退出按钮的事件处理程序中，先**调用退出接口**（让服务端退出），再**移除本地token**（本地退出）。 
6. 将登陆状态 isLogin 设置为 false。 
7. 清空用户状态对象。 

`代码：`

```js
  // 退出登录
  logout = () => {
    alert('提示', '确定退出吗？', [
      { text: '取消' },
      {
        text: '确定', onPress: async () => {
          let res = await logout();
          console.log(res)
          if (res.status === 200) {
            removeToken();
            this.setState({
              isLogin: false,
              userInfo: {}
            })
          } else {
            this.props.history.push('/login')
          }
        }
      },
    ])
  }
```

`注意`: axios.post()方法的header的设置，第三个参数中传入headers配置

#### 05-我的-统一设置请求头-token

`目的：`在axios的请求拦截器中,筛选需要设置headers的请求=》进行单独处理

`步骤：`

2. 在请求拦截器=〉获取到当前请求的接口路径（url）。 
3. 判断接口路径，**是否是以 /user 开头**，并且**不是登录或注册接口**（只给需要的接口添加请求头）。 
4. 如果是，就**添加请求头 authorization**。 

`代码：`

```js
import axios from 'axios'
import { Toast } from 'antd-mobile';
import { getToken } from '.';

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
  // 请求开始，显示loading
  // 根据条件统一设置=》请求头headers=>token
  const { url, headers } = config;
  if (url.startsWith('/user') && url !== '/user/registered' && url !== '/user/login') {
    headers.authorization = getToken()
  }

  Toast.loading('加载中...', 0)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

```

`注意：`文件中发送请求就都可以使用axios.js，不需要手动设置headers。（去除个人中心中：获取用户信息和登出后台接口设置的headers）

#### 06-房源详情-收藏房源-加载-检查是否收藏

`目的：` 进入HouseDetail组件=》实现**组件加载时检查房源是否收藏**，显示对应视图

`步骤：`

1. 在 state 中添加状态：isFavorite （表示是否收藏） ，默认值为 false。 
2. 创建方法 checkFavorite，在进入房源详情页面时调用该方法。 
3. 先调用 isAuth 方法，来判断是否已登录。 
4. 如果未登录，直接 return，不再检查是否收藏。 
5. 如果已登录，从路由参数中，获取到当前房屋id。 
6. 调用接口，查询该房源是否收藏。 
7. 如果返回状态码为 200 ，就更新 isFavorite；否则，不做任何处理。 
8. 在页面结构中，通过状态 isFavorite 修改收藏按钮的文字和图片内容

说明：登录过的用户，才能查看房源是否收藏过。

`代码：`

```js
  // 检查房子是否收藏过
  checkHouseFav = async () => {
    if (!isAuth) return;
    const { id } = this.props.match.params;
    let res = await getHouseFav(id);
    console.log(res)
    if (res.status === 200) {
      this.setState({
        isFavorite: res.data.isFavorite
      })
    }else {
      // 如果token过期，提示用户是否重新登录
    }
  }
```

注意：如果token过期，提示用户是否重新登录

#### 07-房源详情-点击-收藏房源

`目的：`组件加载完成后，点击收藏房源

`步骤：`

1. 给收藏按钮绑定单击事件，创建方法 handleFavorite 作为事件处理程序。
2. 调用 isAuth 方法，判断是否登录。
3. 如果未登录，则使用 Modal.alert 提示用户是否去登录。
4. 如果点击取消，则不做任何操作。 
5. 如果点击去登录，**传递当前页面url**,跳转**到登录页面**
6. 登录完成后再跳回当前页面
7. 根据**状态数据 isFavorite 判断**，当前房源**是否收藏**
8. 如果未收藏，就调用添加收藏接口，添加收藏。
9. 如果已收藏，就调用删除收藏接口，删除收藏。 

`代码：`

```js
 // 处理收藏
  handleFavorite = async () => {
    const { history, match, location } = this.props;
    console.log(this.props)
    if (!isAuth()) {
      alert('提示', '登录后才能收藏房源，是否登录？', [
        { text: '取消' },
        {
          text: '去登录', onPress: async () => {
            history.push({pathname:'/login', data:{backUrl: location.pathname} })
          }
        }
      ])
    } else {
      const { isFavorite } = this.state;
      const { id } = match.params;
      if (isFavorite) {
        // 删除收藏
        const res = await delFav(id);
        res.status === 200 && this.setState({
          isFavorite: false
        })
      } else {
        // 添加收藏
        const res = await addFav(id);
        if (res.status === 200) {
          this.setState({
            isFavorite: true
          })
        }
      }
    }
  }
```

#### 08-发布房源-显示

`目的：`配置房源管理相关的路由,登录成功后,进入到发布房源的组件（`02-其它资源/准备组件/Rent`）

`步骤：`

1. 把Rent目录放入到`src/pages`下
2. 配置准备好的三个组件 Rent房源管理、 RentAdd发布房源、 RentSearch搜索发布的房源所在的小区的路由

`App.js代码：`

```js
<Route path="/rent" exact component={Rent} />
<Route path="/rent/add" component={RentAdd} />
<Route path="/rent/search" component={RentSearch} />
```

注意：已发布房源列表路由配置添加=》`exact`精确匹配

#### 09-发布房源-Rent相关组件说明

`目的：`分析和说明发布房源准备组件；获取已发布房源列表

`步骤：`

1. 封装获取=》已发布房源的接口
2. 在`Rent/index.js`中导入，渲染列表

`分析：`

> 目录说明

1. index.js->已经发布房源的列表
2. Add/index.js->发布房源的表单组件
3. Search/index.js->搜索当前城市的小区

> 文件说明

* `Rent/index.js`

1. HouseItem列表中的每一行

   1. 点击->之前写过的HouseDetail房屋详情

2. 页面加载完毕->**获取当前用户的发布房源**

3. state->list

   1. 如果没有->NoHouse
   2. 如果有->map遍历渲染HouseItem

   

* `Rent/Add/index.js`

> 整体一个表单

1. 选择小区->**进入/rent/search组件**
2. 使用HousePackage房屋配套组件
3. 表单元素->**受控处理**
   1. InputItem 输入框
   2. Picker 选择器
   3. ImagePicker 图片选择器
   4. TextareaItem 多行文本输入框
4. 取消->
   1. 放弃->回到上一页
   2. 继续编辑->啥都不干
5. 提交->
   1. **发送表单请求**
   2. **回到发布房源的列表组件(/rent)**



* `Rent/Search/index.js`

1. 取消->回到rent/add
2. 点击搜索结果->**回传小区名**



#### 10-搜索房源-搜索小区-配置搜索框

`目的：`处理发布房源中小区选择功能

>  使用ant的SearchBar组件

`步骤：`

1. 分析SearchBar用法
2. 添加change事件，为空时=》返回

```js
// 处理搜索
handlerSearch = (v) => {
  // 去空格
  let val = v.trim();
  // 处理空的情况
  if (val.length === 0) {
    return this.setState({
      searchTxt: ''
    })
  }
  this.setState({
    searchTxt: val
  })
}
```

#### 11-搜索房源-搜索小区-显示结果列表

`目的：`搜索时调用接口，获取带有当前关键词的小区列表

`步骤：`

1. 在change事件中，获取关键词
2. 先修改searchTxt的状态
3. 在关键词显示后=》调用接口获取小区数据

```js
  // 处理搜索
  handlerSearch = (v) => {
    // 去空格
    let val = v.trim();
    if (val.length === 0) {
      return this.setState({
        searchTxt: '',
        tipsList: []
      })
    }
    this.setState({
      searchTxt: val
    }, async () => {
      // 调用接口查询小区
      let { status, data } = await getCommunity(this.cityId, val);
      if (status === 200) {
        this.setState({
          tipsList: data
        })
      }
    })

  }
```

#### 12-搜索房源-进入发布房源组件

`目的：`点击某条搜索结果,进入发布房源组件,同时携带数据

`步骤：`

1. 给搜索**列表项添加单击事件**。 
2. 在事件处理程序中，**调用 history.replace() 方法跳转**到发布房源页面。 
3. 将被点击的小区信息**（id, name）作为数据一起传递过去**。
4. 在发布房源页面，**判断 history.loaction.state 是否为空**。
5. 如果为空，不做任何处理。
6. 如果不为空，则将小区信息存储到发布房源页面的状态中。 

`代码：` 

* Search组件

```js
 renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li
        key={item.community}
        className={styles.tip}
        onClick={() => {
          this.props.history.replace(`/rent/add`, {
            id: item.community,
            name: item.communityName
          })
        }}
      >
        {item.communityName}
      </li>
    ))
  }
```

* Add组件

```js
constructor(props) {
  super(props)

  const community = {
    name: '',
    id: ''
  }
  const { state } = props.location
  if (state) {
    community.name = state.name
    community.id = state.id
  }
```

`注意`:

1. this.props.hisory.replace(path,state)->跳转的同时，传递数据
2. this.props.location.state-> 接收数据

#### 13-发布房源-获取表单数据-InputItem、Picker和TextareaItem

`目的：`获取InputItem、Picker、TextareaItem组件数据（受控组件=》双向绑定）

`分析：`（根据所使用组件分析组件类型，分别处理）

1. InputItem、TextareaItem、Picker 组件，都使用 onChange 配置项，来获取当前值。 
2. 处理方式：封装一个事件处理程序 getValue，接收name和val, 来统一获取三种组件的值。 

`步骤：`

1. 创建方法 getValue 作为三个组件的事件处理程序。 
2. 该方法接收两个参数：1-name 当前状态名； 2-value 当前输入值或选中值。 
3. 分别给 InputItem / TextareaItem / Picker 组件**绑定对应的状态数据**，**添加 onChange** 事件。 
4. 分别调用 getValue 并传递 name 和 value 两个参数（**注意**：Picker 组件选中值为数组，而接口需要字符串，所以，取索引号为 0 的值即可）。 
5. 调用 setState() 更新状态，刷新视图

`代码：`

```js
// 获取表单输入值
getValue = (name, v) => {
    console.log(name, v)
    this.setState({
      [name]: v
    })
  }
...

// 处理受控组件
<InputItem placeholder="请输入租金/月" extra="￥/月"
      onChange={(v) => this.getValue('price', v)}
      value={price}>
      租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
</InputItem>
...
```

注意：Picker组件数据是数组，它是一列，取数组第一项的值



#### 14-发布房源-获取HousePackage组件的选中数据

`目的：`使用HousePackage组件的选择功能，获取选中数据

`步骤：`

1. 给 HousePackage 组件，添加 onSelect 属性。 
2. 在 onSelect 处理方法中，通过参数获取到当前选中项的值。 (子传父)
3. 根据发布房源接口的参数说明，将获取到的数组类型的选中值，转化为字符串类型。 
4. 调用 setState() 更新状态。 

`代码：`

```js
// 子传父-> 把数据join成|分割的字符串
 <HousePackage
    select
    onSelect={selectNames => {
        this.setState({
        supporting: selectNames.join('|')
    })
  }}
/>
```



#### 15-发布房源-配置ImagePicker组件

`目的：`根据ant的使用文档配置图片上传组件

`步骤：`

1. 给 ImagePicker 组件添加 onChange 配置项。 
2. 通过 onChange 的参数，获取到上传的图片，并存储到状态 tempSlides 中。 

`代码：`

```js
handleImage = (files, type, index) => {
  // console.log(files, type, index)
  this.setState({
    tempSlides: files
  })
}
```



#### 16-发布房源-先上传房源图片

`目的：` 根据发布房源接口，最终需要的是：房屋图片路径。 (houses/image接口)

> 发布房源前要先调用接口上传图片，获取上传路径(本地图片存储到服务器的路径)

`步骤：`

1. 给提交（房源）按钮，绑定单击事件。  
2. 在事件处理程序中，判断是否有房屋图片。 
3. 如果没有，不做任何处理。 
4. 如果有，就创建 FormData 的实例对象（form）。 
5. 遍历 tempSlides 数组，分别将每一个图片对象，添加到 form 中（键为： file，根据接口文档获得）。
6. 调用图片上传接口，传递form参数（设置请求头 Content-Type 为 multipart/form-data）。 
7. 通过接口返回值获取到的图片路径

`代码：`

```js
// 发布房源中先调用接口上传图片
addHouse = async () => {
    const { tempSlides } = this.state
    // 上传图片，获取上传位置
    let houseImg;
    if (tempSlides.length) {
      let fm = new FormData();
      tempSlides.forEach((item) => fm.append('file', item.file));
      let res = await uploadHouseImgs(fm);
      console.log(res)
      if (res.status === 200) {
        houseImg = res.data.join('|')
      } else {
        Toast.fail(res.description, 2)
      }
    }
  ...
  }
```



#### 17-发布房源-提交表单

`目的：`对照后台接口所需数据=》进行处理，然后发送给后端保存

`步骤：`

1. 在 addHouse 方法中，从 state 里面获取到**房源的其它数据**。（简单处理边界）

2. 调用发布房源接口，传递所有房屋数据。 

3. 根据接口返回值中的状态码，判断是否发布成功。 

4. 如果状态码是 200，表示发布成功，就提示：发布成功，并**跳转到已发布房源列表**页面。 

    

`代码：`

```js
   // 发布房源
  addHouse = async () => {
    const {
      tempSlides,
      title,
      description,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    } = this.state;
    // 处理边界
    if (!title || !size || !price) {
      return Toast.info('请输入房源基本信息！', 1)
    }
    // 上传图片，获取上传位置
    let houseImg;
    if (tempSlides.length) {
      let fm = new FormData();
      tempSlides.forEach((item) => fm.append('file', item.file));
      let res = await uploadHouseImgs(fm);
      console.log(res)
      if (res.status === 200) {
        houseImg = res.data.join('|')
      } else {
        Toast.fail(res.description, 2)
      }
    }
    // 处理其它数据
    const otd = {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community: community.id
    };
    let ores = await pubHouse(otd)
    console.log('form all data:', otd)
    if (ores.status === 200) {
      Toast.success('发布成功！', 1, () => {
        this.props.history.push('/rent')
      })
    }else {
      if (ores.status === 400) {
        Toast.info('请重新登录！', 1, () => {
          // 传入回跳地址
          this.props.history.push('/login', { backUrl: this.props.location.pathname })
        })
      }
    } 
  }
```

注意：

1. 处理小区数据，获取小区ID
2. 处理token失效的情况，重新登录。

#### 18-总结

