## VUE项目-黑马头条PC端-day09

### 01-每日反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 老师可以在项目完结的时候,给我们做一个整体的项目总结吗,感觉跟着老师的做的话知道怎么做,自己做的话就没有思路,不知道拿到一个项目之后应该做什么 |

- 最后一天，项目总结，项目打包，项目部署。



### 02-每日回顾

- 富文本

  - 基本使用
  - 定制使用

- 封面组件

  - 素材库
  - 上传图片
  - 确认图片

  



### 03-发布文章-封面组件使用

双向数据绑定：

1. `v-model`语法糖
2. `:value=""`  `@input=""`   合在一起就是 `v-model`
3. 如果在组件上：父传子，子传父。

使用v-model指令  `src/views/Publish.vue`

```html
          <div style="margin-top:10px">
            <my-cover v-model="articleForm.cover.images[0]"></my-cover>
          </div>
```

组件支持这个指令  `src/components/my-cover.vue`

```js
  // 父传子，图片地址
  props: ['value'],
```

```html
      <!-- 保证父组件传入图片地址没有的话，显示默认图 -->
      <img :src="value || coverImageUrl" />
```

```diff
    // 确认图片
    confirmImage () {
      // 知道现在激活的tab选项卡是谁
      if (this.activeName === 'image') {
        // 素材库
        if (!this.selectedImageUrl) {
          return this.$message.warning('请先选中一张图片')
        }
        // 预览
-        // this.coverImageUrl = this.selectedImageUrl
        // 提交给父组件，让父组件给绑定的数据赋值。
+        this.$emit('input', this.selectedImageUrl)
      }
      if (this.activeName === 'upload') {
        // 上传图片
        if (!this.uploadImageUrl) {
          return this.$message.warning('请先上传一张图片')
        }
        // 预览
-        // this.coverImageUrl = this.uploadImageUrl
        // 提交给父组件，让父组件给绑定的数据赋值。
+        this.$emit('input', this.uploadImageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false
    },
```



根据业务使用：

1. 根据封面图类型使用组件
2. 如果单张图：使用组件绑定imges[0]数据即可
3. 如果三张图：使用三个组件分别绑定images[0],images[1],images[2]
4. 如果无图，自动：不使用组件即可。
5. 在切换封面类型：重置数组数据。

```html
          <!-- 封面图组件 -->
          <div style="margin-top:10px" v-if="articleForm.cover.type===1">
            <my-cover v-model="articleForm.cover.images[0]"></my-cover>
          </div>
          <div style="margin-top:10px" v-if="articleForm.cover.type===3">
            <my-cover
              style="display:inline-block;margin-right:15px"
              v-model="articleForm.cover.images[i-1]"
              v-for="i in 3" :key="i">
            </my-cover>
          </div>
```

```html
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
```





### 04-发布文章-添加文章

实现的大致步骤：

1. 点击 发布文章 或者  存入草稿  其实都是添加文章。
2. 在调用接口的时候，用？键值对方式传递一个参数 draft 如果值是 false 发布  true  草稿。
3. 发送添加文章的请求，把 articleForm 的对象放到请求体进行提交。
4. 如果成功：成功提示 + 跳转内容管理
5. 如果失败：失败提示



在项目中去实现：

```html
        <el-form-item>
          <el-button @click="addArticle(false)" type="primary">发布文章</el-button>
          <el-button @click="addArticle(true)">存入草稿</el-button>
        </el-form-item>
```

```js
  methods: {
    // 添加文章
    async addArticle (draft) {
      // draft 参数，false 发布  true 草稿，正好就是后台接口需要的数据
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        this.$message.success(draft ? '存入草稿成功' : '发布文章成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    }
  }
```





### 05-发布文章-修改文章

实现的大致步骤：

1. 在进入组件的时候，根据地址栏上是否有id数据，来判断当前的业务场景。
2. 如果地址栏没有id那么添加文章业务场景。
   1. 面包屑文字，发布文章。
   2. 表单是空表单。
   3. 操作按钮：蓝色 发布文章 白色 存入草稿
   4. 添加文章请求
3. 如果地址栏id有值那么修改文章业务场景。
   1. 面包屑文字，修改文章。
   2. 根据ID获取文章信息，填充在表单中。
   3. 操作按钮：绿色按钮，修改文章。
   4. 修改文章请求
4. 如果业务场景需要来回的切换，以上梳理需求需要来回实现的。
   1. 监听业务场景的切换，地址栏上的ID发生了改变，你只需要监听到地址ID值改变
   2. 然后可以根据ID有没有值来，填充表单和清空表单。



在项目中的实现：

- 实现业务场景切换

文字

```html
<my-bread>{{$route.query.id?'修改文章':'发布文章'}}</my-bread>
```

表单

1. 组件初始化

```js
  created () {
    // 如果地址栏上有id就是修改文章，获取文章信息填充表单
    if (this.$route.query.id) {
      this.getArticle()
    }
  },
```

```js
    // 获取文章
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.$route.query.id}`)
      this.articleForm = data
    },
```

2. 切换业务场景

```js
  watch: {
    '$route.query.id': function () {
      // 监听 this.$route.query.id 的数据变化
      if (this.$route.query.id) {
        // 填充表单
        this.getArticle()
      } else {
        // 清空表单
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
```

按钮

```html
        <el-form-item v-if="$route.query.id">
          <el-button type="success">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="addArticle(false)" type="primary">发布文章</el-button>
          <el-button @click="addArticle(true)">存入草稿</el-button>
        </el-form-item>
```



- 修改文章请求
  - 只做修改文章（不做草稿） 地址栏？draft=false 即可
  - 路径上需要传入文章ID，地址 articles/1000
  - 请求体传入 修改后的文章对象信息
  - 进行提交 PUT，响应后
  - 成功：成功提示 + 跳转到内容管理
  - 失败：错误提示

```html
<el-button type="success" @click="updateArticle()">修改文章</el-button>
```

```js
    // 修改文章
    async updateArticle () {
      try {
        await this.$http.put(`articles/${this.$route.query.id}?draft=false`, this.articleForm)
        this.$message.success('修改文章成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    }
```





###总结文章修改一些问题

- 新建文章和修改文章，录入内容的时候，按照后台的约定。
  - 文章标题  5-30 个字符
  - 文章内容  多写几个字
  - 封面，默认是单图，那你一定需要选择一张图片，如果是三图，需要选三张图。
  - 频道一定选择
  - 如果以上有任何一种情况不符合条件，都会报错。 400 错误 。
- 添加文章 & 修改文章，成功后文章的状态。
  - 我使用的是测试账号给大家示范，提交文章后直接就是 审核通过。
  - 如果使用自己的账户添加或修改文章，提交后状态可能是  待审核。
- 修改改文章，我们只做发布不做草稿。



修改文章的时候，在组件初始化后，获取文章信息来填充表单。

```js
  created () {
    // 如果地址栏上有id就是修改文章，获取文章信息填充表单
    if (this.$route.query.id) {
      this.getArticle()
    }
  },
```

在从修改文章到发布文章，清空表单，在发布文章回退到修改文章，填充表单。

```js
  watch: {
    '$route.query.id': function () {
      // 监听 this.$route.query.id 的数据变化
      if (this.$route.query.id) {
        // 填充表单
        this.getArticle()
      } else {
        // 清空表单
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
```

总结：

- 当路由规则发生变化的时候，路由对应的组件才会初始化。







### 06-评论管理-组件与路由

组件：`src/views/Comment.vue`

```html
<template>
  <div class='comment-container'>Comment</div>
</template>

<script>
export default {
  name: 'my-comment'
}
</script>

<style scoped lang='less'></style>

```

路由：`src/router/index.js`

```js
import Comment from '../views/Comment.vue'
```

```diff
      { path: '/', component: Welcome },
      { path: '/article', component: Article },
      { path: '/image', component: Image },
      { path: '/publish', component: Publish },
+      { path: '/comment', component: Comment }
```



### 07-评论管理-基础布局

```html
<template>
  <div class="comment-container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="文章标题"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-comment',
  data () {
    return {
      // 评论列表数据
      comments: []
    }
  }
}
</script>

<style scoped lang='less'></style>

```



### 08-评论管理-列表与分页

实现的大致步骤：

1. 在页面初始化的时候，获取评论列表数据
2. 其实调用的接口和获取文章列表的接口是同一个，但是参数略微不同
   1. 在请求参数中  response_type 值为 comment 即可
3. 响应成功后，获取列表数据 给声明好的 comments 赋值 , 总页数数据提供给分页的
4. 渲染列表，渲染分页



```html
<template>
  <div class="comment-container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <!-- scope.row.comment_status 值false代表正常  值为true代表关闭了 -->
          <template slot-scope="scope">
            {{scope.row.comment_status?'关闭':'正常'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.comment_status" type="success">打开评论</el-button>
            <el-button size="small" v-else type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      @current-change="changePager"
       :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-comment',
  data () {
    return {
      // 评论列表数据
      comments: [],
      // 参数对象
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 总条数
      total: 0
    }
  },
  created () {
    // 组件初始化会执行这个函数
    this.getComments()
  },
  methods: {
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 获取评论列表
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>

```



### 09-评论管理-打开与关闭评论

绑定事件：

```html
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              size="small"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" size="small" v-else type="success">打开评论</el-button>
          </template>
```

处理函数：

```js
    // 切换评论状态
    async toggleStatus (row) {
      // row 当前行数据，其实理解成功 comments数组遍历的时候，每一项数据对象
      try {
        const {
          data: { data }
        } = await this.$http.put(`comments/status?article_id=${row.id}`, {
          allow_comment: !row.comment_status
        })
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        // 更新当前数据中的状态，需要更新视图
        row.comment_status = data.allow_comment
      } catch (e) {
        this.$messge.error('操作失败')
      }
    },
```





### 10-粉丝管理-组件与路由

组件：`src/views/Fans.vue`

```html
<template>
  <div class='fans-container'>Fans</div>
</template>

<script>
export default {
  name: 'my-fans'
}
</script>

<style scoped lang='less'></style>
```

路由：`src/router/index.js`

```js
import Fans from '../views/Fans.vue'
```

```diff
      { path: '/publish', component: Publish },
      { path: '/comment', component: Comment },
+      { path: '/fans', component: Fans }
```



###11-粉丝管理-基础布局

卡片

- 头部-面包屑
- 内容
  - tabs组件
    - 粉丝列表
      - 列表+分页
    - 粉丝画像
      - 使用eacharts



代码

```html
<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="i in 24" :key="i">
              <el-avatar :size="80" :src="circleUrl"></el-avatar>
              <p>tony</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">2</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-fans',
  data () {
    return {
      // tabs的当前激活选项卡的name属性值
      activeName: 'list',
      // 测试头像
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>

```



###12-粉丝管理-粉丝列表

列表及分页结构：

```html
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            :total="total">
          </el-pagination>
        </el-tab-pane>
```

依赖数据：

```diff
		reqParams: {
        page: 1,
        per_page: 24
      },
      list: [],
      total: 0,
-      // 测试头像
-      circleUrl:
-        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
```

依赖函数：

```js
  created () {
    this.getFansList()
  },
  methods: {
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    // 获取素材列表
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.list = data.results
      this.total = data.total_count
    }
  }
```



###13-粉丝管理-粉丝画像

- 默认激活粉丝画像这个tab标签
- 使用echarts画一个柱状图即可