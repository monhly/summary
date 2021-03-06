## 前言

从前端学习到找一份合适的工作，大大小小的面试必不可少，所以我对初级前端面试题进行了初步整理，也方便自己查阅，也希望对小伙伴们有所帮助！
![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720291)

## HTML

### HTML语义化

HTML语义化就是让页面内容结构化，它有如下优点

```
1、易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
2、有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
3、方便其他设备解析，如盲人阅读器根据语义渲染网页
4、有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐
```

如：

```
<header>代表头部
<nav>代表超链接区域
<main>定义文档主要内容
<article>可以表示文章、博客等内容
<aside>通常表示侧边栏或嵌入内容
<footer>代表尾部
```

### HTML5新标签

```
有<header>、<footer>、<aside>、<nav>、<video>、<audio>、<canvas>等...
```

## CSS

### 盒子模型

盒模型分为标准盒模型和怪异盒模型(IE模型)

```
box-sizing：content-box   //标准盒模型
box-sizing：border-box    //怪异盒模型
```

![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720294)
标准盒模型：元素的宽度等于style里的width+margin+border+padding宽

![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720289)

> 如下代码，整个宽高还是120px

```
div{
    box-sizing: content-box;
    margin: 10px;
    width: 100px;
    height: 100px;
    padding: 10px;
}
```

怪异盒模型：元素宽度等于style里的width宽度

![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720293)
如下代码，整个宽高还是100px

```
div{
    box-sizing: border-box;
    margin: 10px;
    width: 100px;
    height: 100px;
    padding: 10px;
}
```

注意：如果你在设计页面中，发现内容区被撑爆了，那么就先检查一下border-sizing是什么，最好在引用reset.css的时候，就对border-sizing进行统一设置，方便管理

### rem与em的区别

> rem是根据根的font-size变化，而em是根据父级的font-size变化

rem：相对于根元素html的font-size，假如html为font-size：12px，那么，在其当中的div设置为font-size：2rem,就是当中的div为24px

em：相对于父元素计算，假如某个p元素为font-size:12px,在它内部有个span标签，设置font-size：2em,那么，这时候的span字体大小为：12*2=24px

### CSS选择器

**css常用选择器**

```
通配符：*
ID选择器：#ID
类选择器：.class
元素选择器：p、a    等
后代选择器：p span、div a   等
伪类选择器：a:hover 等
属性选择器：input[type="text"]  等
```

**css选择器权重**

!important -> 行内样式 -> #id -> .class -> 元素和伪元素 -> * -> 继承 -> 默认

### CSS新特性

```
transition：过渡
transform：旋转、缩放、移动或者倾斜
animation：动画
gradient：渐变
shadow：阴影
border-radius：圆角
```

### 行内元素和块级元素

**行内元素（display: inline）**

宽度和高度是由内容决定，与其他元素共占一行的元素，我们将其叫行内元素，例如：` 、span/i/b/strong/  、 `等

**块级元素（display: block)**

默认宽度由父容器决定，默认高度由内容决定，独占一行并且可以设置宽高的元素，我们将其叫做块级元素，例如：` 、div/p/h1-h6 、等`

在平时，我们经常使用CSS的display: inline-block，使它们拥有更多的状态

### 绝对定位和相对定位的区别

**position: absolute**

绝对定位：是相对于元素最近的已定位的祖先元素

**position: relative**
相对定位：相对定位是相对于元素在文档中的初始位置

### Flex布局

[https://juejin.im/post/5d428c...](https://juejin.im/post/5d428c5451882556dc30535c)

### BFC

**什么是BFC?**

BFC格式化上下文，它是一个独立的渲染区域，让处于 BFC 内部的元素和外部的元素相互隔离，使内外元素的定位不会相互影响

**如何产生BFC?**

display: inline-block

position: absolute/fixed

**BFC作用**

BFC最大的一个作用就是：在页面上有一个独立隔离容器，容器内的元素和容器外的元素布局不会相互影响

```
解决上外边距重叠;重叠的两个box都开启bfc;
解决浮动引起高度塌陷;容器盒子开启bfc
解决文字环绕图片;左边图片div,右边文字容器p,将p容器开启bfc
```

### 水平垂直居中

**Flex布局**

```
display: flex  //设置Flex模式
flex-direction: column  //决定元素是横排还是竖着排
flex-wrap: wrap     //决定元素换行格式
justify-content: space-between  //同一排下对齐方式，空格如何隔开各个元素
align-items: center     //同一排下元素如何对齐
align-content: space-between    //多行对齐方式
```

**水平居中**

```
行内元素：display: inline-block;
块级元素：margin: 0 auto;
Flex: display: flex; justify-content: center
```

**垂直居中**

```
行高 = 元素高：line-height: height
flex: display: flex; align-item: center
```

### less,sass,styus三者的区别

**变量**

Sass声明变量必须是『$』开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号：分隔开。

Less 声明变量用『@』开头，其余等同 Sass。

Stylus 中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。

**作用域*

Sass：三者最差，不存在全局变量的概念

Less：最近的一次更新的变量有效，并且会作用于全部的引用！

Stylus：Sass 的处理方式和 Stylus 相同，变量值输出时根据之前最近的一次定义计算，每次引用最近的定义有效；

**嵌套**

三种 css 预编译器的「选择器嵌套」在使用上来说没有任何区别，甚至连引用父级选择器的标记 & 也相同

**继承**

Sass和Stylus的继承非常像，能把一个选择器的所有样式继承到另一个选择器上。使用『@extend』开始，后面接被继承的选择器。Stylus 的继承方式来自 Sass，两者如出一辙。
Less 则又「独树一帜」地用伪类来描述继承关系；

**导入@Import*

Sass 中只能在使用 url() 表达式引入时进行变量插值

```
$device: mobile;
@import url(styles.#{$device}.css);
```

Less 中可以在字符串中进行插值

```
@device: mobile;
@import "styles.@{device}.css";
```

Stylus 中在这里插值不管用，但是可以利用其字符串拼接的功能实现

```
device = "mobile"
@import "styles." + device + ".css"
```

**总结**

Sass和Less语法严谨、Stylus相对自由。因为Less长得更像 css，所以它可能学习起来更容易。

Sass 和 Compass、Stylus 和 Nib 都是好基友。

Sass 和 Stylus 都具有类语言的逻辑方式处理：条件、循环等，而 Less 需要通过When等关键词模拟这些功能，这方面 Less 比不上 Sass 和 Stylus

Less 在丰富性以及特色上都不及 Sass 和 Stylus，若不是因为 Bootstrap 引入了 Less，可能它不会像现在这样被广泛应用（个人愚见）

### link与@import区别与选择

```css
<style type="text/css">
    @import url(CSS文件路径地址);
</style>
<link href="CSSurl路径" rel="stylesheet" type="text/css" /
```

link功能较多，可以定义 RSS，定义 Rel 等作用，而@import只能用于加载 css；

当解析到link时，页面会同步加载所引的 css，而@import所引用的 css 会等到页面加载完才被加载；

@import需要 IE5 以上才能使用；

link可以使用 js 动态引入，@import不行

### 多行元素的文本省略号

```
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical
```

## JavaScript

### JS的几条基本规范

```
1、不要在同一行声明多个变量
2、请使用===/！==来比较true/false或者数值
3、使用对象字面量替代new Array这种形式
4、不要使用全局变量
5、Switch语句必须带有default分支
6、函数不应该有时候有返回值，有时候没有返回值
7、For循环必须使用大括号
8、IF语句必须使用大括号
9、for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染
```

### JS引用方法

**行内引入**

```
<body>
  <input type="button" onclick="alert('行内引入')" value="按钮"/>
  <button onclick="alert(123)">点击我</button>
</body>
```

**内部引入**

```
<script>
  window.onload = function() {
    alert("js 内部引入！");
  }
</script>
```

**外部引入**

```
<body>
  <div></div>

  <script type="text/javascript" src="./js/index.js"></script>
</body>
```

**注意**

```
1，不推荐写行内或者HTML中插入<script>,因为浏览器解析顺序缘故，如果解析到死循环之类的JS代码，会卡住页面
2，建议在onload事件之后，即等HTML、CSS渲染完毕再执行代码
```

### JS的基本数据类型

Undefined、Null、Boolean、Number、String、新增:Symbol

### 数组操作

> 在 JavaScript 中，用得较多的之一无疑是数组操作，这里过一遍数组的一些用法

```
map: 遍历数组，返回回调返回值组成的新数组
forEach: 无法break，可以用try/catch中throw new Error来停止
filter: 过滤
some: 有一项返回true，则整体为true
every: 有一项返回false，则整体为false
join: 通过指定连接符生成字符串
push / pop: 末尾推入和弹出，改变原数组， 返回推入/弹出项【有误】
unshift / shift: 头部推入和弹出，改变原数组，返回操作项【有误】
sort(fn) / reverse: 排序与反转，改变原数组
concat: 连接数组，不影响原数组， 浅拷贝
slice(start, end): 返回截断后的新数组，不改变原数组
splice(start, number, value...): 返回删除元素组成的数组，value 为插入项，改变原数组
indexOf / lastIndexOf(value, fromIndex): 查找数组项，返回对应的下标
reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur 为当前值(从第二项开始)
```

### JS有哪些内置对象

```
Object是JavaScript中所有对象的父对象

数据封装对象：Object、Array、Boolean、Number和String
其他对象：Function、Arguments、Math、Date、RegExp、Error
```

### get请求传参长度的误区

误区：我们经常说get请求参数的大小存在限制，而post请求的参数大小是无限制的

实际上HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对get请求参数的限制是来源与浏览器或web服务器，浏览器或web服务器限制了url的长度。为了明确这个概念，我们必须再次强调下面几点:

1、HTTP 协议 未规定 GET 和POST的长度限制

2、GET的最大长度显示是因为 浏览器和 web服务器限制了 URI的长度

3、不同的浏览器和WEB服务器，限制的最大长度不一样

4、要支持IE，则最大长度为2083byte，若只支持Chrome，则最大长度 8182byte

### 补充get和post请求在缓存方面的区别

- get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
- post不同，post做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此get请求适合于请求缓存。

### 闭包

**什么是闭包？**

函数A 里面包含了 函数B，而 函数B 里面使用了 函数A 的变量，那么 函数B 被称为闭包。

又或者：闭包就是能够读取其他函数内部变量的函数

```
function A() {
  var a = 1;
  function B() {
    console.log(a);
  }
  return B();
}
```

**闭包的特征**

- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收制回收

**对闭包的理解**

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念

闭包 的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中

闭包的另一个用处，是封装对象的私有属性和私有方法

**闭包的好处**

能够实现封装和缓存等

**闭包的坏处**

就是消耗内存、不正当使用会造成内存溢出的问题

**使用闭包的注意点**

由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露

解决方法是：在退出函数之前，将不使用的局部变量全部删除

**闭包的经典问题**

```
for(var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

这段代码输出

```
答案：3个3
解析：首先，for 循环是同步代码，先执行三遍 for，i 变成了 3；然后，再执行异步代码 setTimeout，这时候输出的 i，只能是 3 个 3 了
```

有什么办法依次输出0 1 2

> 第一种方法

使用let

```
for(let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

在这里，每个 let 和代码块结合起来形成块级作用域，当 setTimeout() 打印时，会寻找最近的块级作用域中的 i，所以依次打印出 0 1 2

如果这样不明白，我们可以执行下边这段代码

```
for(let i = 0; i < 3; i++) {
  console.log("定时器外部：" + i);
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

此时浏览器依次输出的是：

```
定时器外部：0
定时器外部：1
定时器外部：2
0
1
2
```

即代码还是先执行 for 循环，但是当 for 结束执行到了 setTimeout 的时候，它会做个标记，这样到了 console.log(i) 中，i 就能找到这个块中最近的变量定义

> 第二种方法

使用立即执行函数解决闭包的问题

```
for(let i = 0; i < 3; i++) {
  (function(i){
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i)
}
```

### JS作用域及作用域链

**作用域**

在JavaScript中，作用域分为 全局作用域 和 函数作用域

> 全局作用域

代码在程序的任何地方都能被访问，window 对象的内置属性都拥有全局作用域

> 函数作用域

在固定的代码片段才能被访问

例子：
![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720292)
作用域有上下级关系，上下级关系的确定就看函数是在哪个作用域下创建的。如上，fn作用域下创建了bar函数，那么“fn作用域”就是“bar作用域”的上级。

作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

变量取值：到创建 这个变量 的函数的作用域中取值

**作用域链**

一般情况下，变量取值到 创建 这个变量 的函数的作用域中取值。

但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链
![cmd-markdown-logo](https://segmentfault.com/img/remote/1460000021720290)

### 原型和原型链

**原型和原型链的概念**

每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去

**原型和原型链的关系**

```
instance.constructor.prototype = instance.__proto__
```

**原型和原型链的特点**

JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变

当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的

就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象

### 组件化和模块化

**组件化**

**为什么要组件化开发**

有时候页面代码量太大，逻辑太多或者同一个功能组件在许多页面均有使用，维护起来相当复杂，这个时候，就需要组件化开发来进行功能拆分、组件封装，已达到组件通用性，增强代码可读性，维护成本也能大大降低

**组件化开发的优点**

很大程度上降低系统各个功能的耦合性，并且提高了功能内部的聚合性。这对前端工程化及降低代码的维护来说，是有很大的好处的，耦合性的降低，提高了系统的伸展性，降低了开发的复杂度，提升开发效率，降低开发成本

**组件化开发的原则**

- 专一
- 可配置性
- 标准性
- 复用性
- 可维护性

**模块化**

**为什么要模块化**

早期的javascript版本没有块级作用域、没有类、没有包、也没有模块，这样会带来一些问题，如复用、依赖、冲突、代码组织混乱等，随着前端的膨胀，模块化显得非常迫切

**模块化的好处**

- 避免变量污染，命名冲突
- 提高代码复用率
- 提高了可维护性
- 方便依赖关系管理

**模块化的几种方法**

- 函数封装

```
var myModule = {
    var1: 1,
    
    var2: 2,
    
    fn1: function(){
    
    },
    
    fn2: function(){
    
    }
}
总结：这样避免了变量污染，只要保证模块名唯一即可，同时同一模块内的成员也有了关系

缺陷：外部可以睡意修改内部成员，这样就会产生意外的安全问题
```

- 立即执行函数表达式(IIFE)

```
var myModule = (function(){
    var var1 = 1;
    var var2 = 2;
    
    function fn1(){
    
    } 
    
    function fn2(){
    
    }

return {
    fn1: fn1,
    fn2: fn2
};
})();
总结：这样在模块外部无法修改我们没有暴露出来的变量、函数

缺点：功能相对较弱，封装过程增加了工作量，仍会导致命名空间污染可能、闭包是有成本的
```

### 图片的预加载和懒加载

- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染
- 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数

两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。预加载则会增加服务器前端压力，懒加载对服务器有一定的缓解压力作用。

### mouseover和mouseenter的区别

mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout

mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave

### 解决异步回调地狱

promise、generator、async/await

### 对This对象的理解

this总是指向函数的直接调用者（而非间接调用者）

如果有new关键字，this指向new出来的那个对象

在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window

## Vue

### vue生命周期

**什么是Vue生命周期？**

Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期

**Vue生命周期的作用是什么？**

它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑

**Vue生命周期总共有几个阶段？**

它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后

**第一次页面加载会触发哪几个钩子？**

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

**DOM渲染在哪个周期中就已经完成？**

DOM 渲染在 mounted 中就已经完成了

**每个生命周期适合哪些场景？**

生命周期钩子的一些使用方法：

beforecreate : 可以在这加个loading事件，在加载实例时触发

created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用

mounted : 挂载元素，获取到DOM节点

updated : 如果对数据统一处理，在这里写上相应函数

beforeDestroy : 可以做一个确认停止事件的确认框

nextTick : 更新数据后立即操作dom

### v-show与v-if区别

v-show是css切换，v-if是完整的销毁和重新创建

使用 频繁切换时用v-show，运行时较少改变时用v-if

v-if=‘false’ v-if是条件渲染，当false的时候不会渲染

### 开发中常用的指令有哪些

v-model :一般用在表达输入，很轻松的实现表单控件和数据的双向绑定

v-html: 更新元素的 innerHTML

v-show 与 v-if: 条件渲染, 注意二者区别

```
使用了v-if的时候，如果值为false，那么页面将不会有这个html标签生成
v-show则是不管值为true还是false，html元素都会存在，只是CSS中的display显示或隐藏
```

v-on : click: 可以简写为@click,@绑定一个事件。如果事件触发了，就可以指定事件的处理函数
v-for:基于源数据多次渲染元素或模板块
v-bind: 当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

```
语法：v-bind:title="msg" 简写：:title="msg"
```

### 绑定class的数组用法

对象方法 v-bind:class="{'orange': isRipe, 'green': isNotRipe}"

数组方法 v-bind:class="[class1, class2]"

行内 v-bind:style="{color: color, fontSize: fontSize+'px' }"

### 组件之间的传值通信

**父组件给子组件传值**

> 使用props，父组件可以使用props向子组件传递数据

父组件vue模板father.vue

```
<template>
    <child :msg="message"></child>
</template>

<script>
import child from './child.vue';
export default {
    components: {
        child
    },
    data () {
        return {
            message: 'father message';
        }
    }
}
</script>
```

子组件vue模板child.vue:

```
<template>
    <div>{{msg}}</div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    }
}
</script>
```

**子组件向父组件通信**

> 父组件向子组件传递事件方法，子组件通过$emit触发事件，回调给父组件

父组件vue模板father.vue:

```
<template>
    <child @msgFunc="func"></child>
</template>

<script>
import child from './child.vue';
export default {
    components: {
        child
    },
    methods: {
        func (msg) {
            console.log(msg);
        }
    }
}
</script>
```

子组件vue模板child.vue:

```
<template>
    <button @click="handleClick">点我</button>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    methods () {
        handleClick () {
            //........
            this.$emit('msgFunc');
        }
    }
}
</script>
```

**非父子，兄弟组件之间通信**

> 可以通过实例一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，然后通过分别调用Bus事件触发和监听来实现通信和参数传递

Bus.js可以是这样:

```
import Vue from 'vue'
export default new Vue()
```

在需要通信的组件都引入Bus.js:

```
<template>
    <button @click="toBus">子组件传给兄弟组件</button>
</template>

<script>
import Bus from '../common/js/bus.js'
export default{
    methods: {
        toBus () {
            Bus.$emit('on', '来自兄弟组件')
        }
      }
}
</script>
```

另一个组件也import Bus.js 在钩子函数中监听on事件

```
import Bus from '../common/js/bus.js'
export default {
    data() {
      return {
        message: ''
      }
    },
    mounted() {
       Bus.$on('on', (msg) => {
         this.message = msg
       })
     }
   }
```

### 路由跳转方式

```
1，<router-link to='home'> router-link标签会渲染为<a>标签，咋填template中的跳转都是这种；

2，另一种是编程是导航 也就是通过js跳转 比如 router.push('/home')
```

### MVVM

```
M - Model，Model 代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑

V - View，View 代表 UI 组件，它负责将数据模型转化为 UI 展现出来

VM - ViewModel，ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步 View 和 Model 的对象，连接 Model 和 View
```

### computed和watch有什么区别?

**computed:**

```
1. computed是计算属性,也就是计算值,它更多用于计算值的场景
2. computed具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
3. computed适用于计算比较消耗性能的计算场景
```

**watch:**

```
1. 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察props $emit或者本组件的值,当数据变化时来执行回调进行后续操作
2. 无缓存性，页面重新渲染时值不变化也会执行
```

**小结:**

```
1. 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
2. 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
```

### key

key是为Vue中的vnode标记的唯一id，通过这个key，我们的diff操作可以 更准确、更快速

**准确:**
如果不加key,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来，会产生一系列的bug

**快速:**
key的唯一性可以被Map数据结构充分利用

### 组件中的data为什么是函数？

为什么组件中的data必须是一个函数，然后return一个对象，而new Vue实例里，data可以直接是一个对象？

```
// data
data() {
  return {
    message: "子组件",
    childName:this.name
  }
}

// new Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
```

因为组件是用来复用的，JS里对象是引用关系，这样作用域没有隔离，而new Vue的实例，是不会被复用的，因此不存在引用对象问题

### Class 与 Style 如何动态绑定？

> Class 可以通过对象语法和数组语法进行动态绑定：

**对象语法**

```
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

data: {
  isActive: true,
  hasError: false
}
```

**数组语法**

```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

> Style 也可以通过对象语法和数组语法进行动态绑定：

**对象语法**

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```

**数组语法**

```
<div v-bind:style="[styleColor, styleSize]"></div>

data: {
  styleColor: {
     color: 'red'
   },
  styleSize:{
     fontSize:'23px'
  }
}
```

### vue的单项数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解

额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改

有两种常见的试图改变一个 prop 的情形 :

这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用

> 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

这个 prop 以一种原始的值传入且需要进行转换

> 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

### keep-alive

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### v-model 的原理

vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件;

以 input 表单元素为例：

```
<input v-model='something'>
```

相当于

```
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：

```
父组件：
<ModelChild v-model="message"></ModelChild>

子组件：
<div>{{value}}</div>

props:{
    value: String
},
methods: {
  test1(){
     this.$emit('input', '小红')
  },
},
```

### nextTick()

在下次DOM更新循环结束之后执行延迟回调。在修改数据之后，立即使用的这个回调函数，获取更新后的DOM

```
// 修改数据
vm.msg = 'Hello'
// DOM 还未更新
Vue.nextTick(function () {
  // DOM 更新
})
```

### vue插槽

个人觉得这篇文章写的还可以：[https://www.cnblogs.com/china...](https://www.cnblogs.com/chinabin1993/p/9115396.html)

**单个插槽**

```
当子组件模板只有一个没有属性的插槽时，
父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，
并替换掉插槽标签本身
```

**命名插槽**

```
solt元素可以用一个特殊的特性name来进一步配置如何分发内容。
多个插槽可以有不同的名字。 这样可以将父组件模板中 slot 位置，
和子组件 slot 元素产生关联，便于插槽内容对应传递
```

**作用域插槽**

```
可以访问组件内部数据的可复用插槽(reusable slot)
在父级中，具有特殊特性 slot-scope 的<template> 元素必须存在，
表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，
此变量接收从子组件传递过来的 prop 对象
```

### vue-router有哪几种导航钩子

第一种：是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截

第二种：组件内的钩子

第三种：单独路由独享组件

### vuex

**vuex是什么？**

```
vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data

state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新

它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性
```

Vuex有5种属性: 分别是 state、getter、mutation、action、module;

**state**
Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据

**mutations**
mutations定义的方法动态修改Vuex 的 store 中的状态或数据

**getters**
类似vue的计算属性，主要用来过滤一些数据

**action**
actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action

**总结**
vuex 一般用于中大型 web 单页应用中对应用的状态进行管理，对于一些组件间关系较为简单的小型应用，使用 vuex 的必要性不是很大，因为完全可以用组件 prop 属性或者事件来完成父子组件之间的通信，vuex 更多地用于解决跨组件通信以及作为数据中心集中式存储数据

### 你有对 Vue 项目进行哪些优化？

**代码层面的优化**

```
v-if 和 v-show 区分使用场景
computed 和 watch  区分使用场景
v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
长列表性能优化
事件的销毁
图片资源懒加载
路由懒加载
第三方插件的按需引入
优化无限列表性能
服务端渲染 SSR or 预渲染
```

**Webpack 层面的优化**

```
Webpack 对图片进行压缩
减少 ES6 转为 ES5 的冗余代码
提取公共代码
模板预编译
提取组件的 CSS
优化 SourceMap
构建结果输出分析
Vue 项目的编译优化
```

**基础的 Web 技术的优化**

```
开启 gzip 压缩
浏览器缓存
CDN 的使用
使用 Chrome Performance 查找性能瓶颈
```

## ES6

### var、let、const之间的区别

var声明变量可以重复声明，而let不可以重复声明

var是不受限于块级的，而let是受限于块级

var会与window相映射（会挂一个属性），而let不与window相映射

var可以在声明的上面访问变量，而let有暂存死区，在声明的上面访问变量会报错

const声明之后必须赋值，否则会报错

const定义不可变的量，改变了就会报错

const和let一样不会与window相映射、支持块级作用域、在声明的上面访问变量会报错

### 解构赋值

**数组解构**

```
let [a, b, c] = [1, 2, 3]   //a=1, b=2, c=3
let [d, [e], f] = [1, [2], 3]    //嵌套数组解构 d=1, e=2, f=3
let [g, ...h] = [1, 2, 3]   //数组拆分 g=1, h=[2, 3]
let [i,,j] = [1, 2, 3]   //不连续解构 i=1, j=3
let [k,l] = [1, 2, 3]   //不完全解构 k=1, l=2
```

**对象解构**

```
let {a, b} = {a: 'aaaa', b: 'bbbb'}      //a='aaaa' b='bbbb'
let obj = {d: 'aaaa', e: {f: 'bbbb'}}
let {d, e:{f}} = obj    //嵌套解构 d='aaaa' f='bbbb'
let g;
(g = {g: 'aaaa'})   //以声明变量解构 g='aaaa'
let [h, i, j, k] = 'nice'    //字符串解构 h='n' i='i' j='c' k='e'
```

**函数参数的定义**

一般我们在定义函数的时候，如果函数有多个参数时，在es5语法中函数调用时参数必须一一对应，否则就会出现赋值错误的情况，来看一个例子：

```
function personInfo(name, age, address, gender) {
  console.log(name, age, address, gender)
}
personInfo('william', 18, 'changsha', 'man')
```

上面这个例子在对用户信息的时候需要传递四个参数，且需要一一对应，这样就会极易出现参数顺序传错的情况，从而导致bug，接下来来看es6解构赋值是怎么解决这个问题的：

```
function personInfo({name, age, address, gender}) {
  console.log(name, age, address, gender)
}
personInfo({gender: 'man', address: 'changsha', name: 'william', age: 18})
```

这么写我们只知道要传声明参数就行来，不需要知道参数的顺序也没关系

**交换变量的值**

在es5中我们需要交换两个变量的值需要借助临时变量的帮助，来看一个例子：

```
var a=1, b=2, c
c = a
a = b
b = c
console.log(a, b)
```

来看es6怎么实现：

```
let a=1, b=2;
[b, a] = [a, b]
console.log(a, b)
```

<font face="楷体">是不是比es5的写法更加方便呢

**函数默认参数**

<font face= "楷体">在日常开发中，经常会有这种情况：函数的参数需要默认值，如果没有默认值在使用的时候就会报错，来看es5中是怎么做的：

```
function saveInfo(name, age, address, gender) {
  name = name || 'william'
  age = age || 18
  address = address || 'changsha'
  gender = gender || 'man'
  console.log(name, age, address, gender)
}
saveInfo()
```

<font face="楷体">在函数离 main先对参数做一个默认值赋值，然后再使用避免使用的过程中报错，再来看es6中的使用的方法：

```
function saveInfo({name= 'william', age= 18, address= 'changsha', gender= 'man'} = {}) {
  console.log(name, age, address, gender)
}
saveInfo()
```

<font face="楷体">在函数定义的时候就定义了默认参数，这样就免了后面给参数赋值默认值的过程，是不是看起来简单多了

### forEach、for in、for of三者区别

forEach更多的用来遍历数

for in 一般常用来遍历对象或json

for of数组对象都可以遍历，遍历对象需要通过和Object.keys()

for in循环出的是key，for of循环出的是value

### 使用箭头函数应注意什么？

1、用了箭头函数，this就不是指向window，而是父级（指向是可变的）
2、不能够使用arguments对象
3、不能用作构造函数，这就是说不能够使用new命令，否则会抛出一个错误
4、不可以使用yield命令，因此箭头函数不能用作 Generator 函数

### Set、Map的区别

<font face="楷体">应用场景Set用于数据重组，Map用于数据储存

<font face="楷体" color=#CD2626>**Set：**
1，成员不能重复
2，只有键值没有键名，类似数组
3，可以遍历，方法有add, delete,has

<font face="楷体" color=#CD2626>**Map:**
1，本质上是健值对的集合，类似集合
2，可以遍历，可以跟各种数据格式转换

### promise对象的用法,手写一个promise

<font face="楷体">promise是一个构造函数，下面是一个简单实例

```
var promise = new Promise((resolve,reject) => {
    if (操作成功) {
        resolve(value)
    } else {
        reject(error)
    }
})
promise.then(function (value) {
    // success
},function (value) {
    // failure
})
```

## Ajax

### 如何创建一个ajax

(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象
(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
(3)设置响应HTTP请求状态变化的函数
(4)发送HTTP请求
(5)获取异步调用返回的数据
(6)使用JavaScript和DOM实现局部刷新

### 同步和异步的区别

**同步：**
浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作

**异步：**
浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容

### ajax的优点和缺点

**ajax的优点**

1、无刷新更新数据（在不刷新整个页面的情况下维持与服务器通信）
2、异步与服务器通信（使用异步的方式与服务器通信，不打断用户的操作）
3、前端和后端负载均衡（将一些后端的工作交给前端，减少服务器与宽度的负担）
4、界面和应用相分离（ajax将界面和应用分离也就是数据与呈现相分离）

**ajax的缺点**

1、ajax不支持浏览器back按钮
2、安全问题 Aajax暴露了与服务器交互的细节
3、对搜索引擎的支持比较弱
4、破坏了Back与History后退按钮的正常行为等浏览器机制

### get和post的区别

1、get和post在HTTP中都代表着请求数据，其中get请求相对来说更简单、快速，效率高些
2、get相对post安全性低
3、get有缓存，post没有
4、get体积小，post可以无限大
5、get的url参数可见，post不可见
6、get只接受ASCII字符的参数数据类型，post没有限制
7、get请求参数会保留历史记录，post中参数不会保留
8、get会被浏览器主动catch，post不会，需要手动设置
9、get在浏览器回退时无害，post会再次提交请求

**什么时候使用post？**

post一般用于修改服务器上的资源，对所发送的信息没有限制。比如

1、无法使用缓存文件（更新服务器上的文件或数据库）
2、向服务器发送大量数据（POST 没有数据量限制）
3、发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

### 如何解决跨域问题

跨域的概念：协议、域名、端口都相同才同域，否则都是跨域

**解决跨域问题：**

1、使用JSONP（json+padding）把数据内填充起来
2、CORS方式（跨域资源共享），在后端上配置可跨域
3、服务器代理，通过服务器的文件能访问第三方资源

### 什么是Ajax和JSON，它们的优点和缺点

**Ajax：**

Ajax是异步JavaScript和XML，用于在Web页面中实现异步数据交互

**Ajax优点：**

异步请求响应快，用户体验好；页面无刷新、数据局部更新；按需取数据，减少了冗余请求和服务器的负担；

**Ajax缺点：**

异步回调问题、this指向问题、路由跳转back问题；对搜索引擎的支持比较弱，对于一些手机还不是很好的支持

**JSON：**

是一种轻量级的数据交换格式，看着像对象，本质是字符串

**JSON优点：**

轻量级、易于人的阅读和编写，便于js解析，支持复合数据类型

**JSON缺点：**

没有XML格式这么推广的深入人心和使用广泛, 没有XML那么通用性

## Github

### git常用的命令

从远程库克隆到本地：git clone 网站上的仓库地址

新增文件的命令：git add .

提交文件的命令：git commit –m或者git commit –a

查看工作区状况：git status –s

拉取合并远程分支的操作：git fetch/git merge或者git pull

查看提交记录命令：git reflog

## webpack

### webpack打包原理

<font face = "楷体">webpack只是一个打包模块的机制，只是把依赖的模块转化成可以代表这些包的静态文件。webpack就是识别你的 入口文件。识别你的模块依赖，来打包你的代码。至于你的代码使用的是commonjs还是amd或者es6的import。webpack都会对其进行分析。来获取代码的依赖。webpack做的就是分析代码。转换代码，编译代码，输出代码。webpack本身是一个node的模块，所以webpack.config.js是以commonjs形式书写的(node中的模块化是commonjs规范的)

### 模块热更新

模块热更新是webpack的一个功能，他可以使代码修改过后不用刷新就可以更新，是高级版的自动刷新浏览器

> devServer中通过hot属性可以控制模块的热替换

**通过配置文件**

```
const webpack = require('webpack');
const path = require('path');
let env = process.env.NODE_ENV == "development" ? "development" : "production";
const config = {
  mode: env,
 devServer: {
     hot:true
 }
}
  plugins: [
     new webpack.HotModuleReplacementPlugin(), //热加载插件
  ],
module.exports = config;
```

**通过命令行**

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "NODE_ENV=development  webpack-dev-server --config  webpack.develop.config.js --hot",
  },
```

### 如何提高webpack构建速度

1、通过externals配置来提取常用库

2、利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来

3、使用Happypack 实现多线程加速编译

要注意的第一点是，它对file-loader和url-loader支持不好，所以这两个loader就不需要换成happypack了，其他loader可以类似地换一下

4、使用Tree-shaking和Scope Hoisting来剔除多余代码
5、使用fast-sass-loader代替sass-loader
6、babel-loader开启缓存

babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率
可以加上cacheDirectory参数或使用 transform-runtime 插件试试

```
// webpack.config.js
use: [{
    loader: 'babel-loader',
    options: {
        cacheDirectory: true
}]
// .bablerc
{
    "presets": [
        "env",
        "react"
    ],
    "plugins": ["transform-runtime"]
}
```

不需要打包编译的插件库换成全局"script"标签引入的方式

比如jQuery插件，react, react-dom等，代码量是很多的，打包起来可能会很耗时
可以直接用标签引入，然后在webpack配置里使用 expose-loader 或 externals 或 ProvidePlugin 提供给模块内部使用相应的变量

```
// @1
use: [{
    loader: 'expose-loader',
    options: '$'
    }, {
    loader: 'expose-loader',
    options: 'jQuery'
    }]
// @2
externals: {
        jquery: 'jQuery'
    },
// @3
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
```

8、优化构建时的搜索路径

在webpack打包时，会有各种各样的路径要去查询搜索，我们可以加上一些配置，让它搜索地更快
比如说，方便改成绝对路径的模块路径就改一下，以纯模块名来引入的可以加上一些目录路径
还可以善于用下resolve alias别名 这个字段来配置
还有exclude等的配置，避免多余查找的文件，比如使用babel别忘了剔除不需要遍历的

### webpack的优点

专注于处理模块化的项目，能做到开箱即用，一步到位

可通过plugin扩展，完整好用又不失灵活

使用场景不局限于web开发

社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展

良好的开发体验

### webpack的缺点

webpack的缺点是只能用于采用模块化开发的项目

## 微信小程序

### 文件主要目录及文件作用

```
- component —————————————————— 组件文件夹
  - navBar                  —— 底部组件
    - navBar.js             —— 底部组件的 JS 代码
    - navBar.json           —— 底部组件的配置文件
    - navBar.wxml           —— 底部组件的 HTML 代码
    - navBar.wxss           —— 底部组件的 CSS 代码
- pages  ————————————————————— 页面文件夹
  - index                   —— 首页
    - index.js              —— 首页的 JS 代码
    - index.json            —— 首页的配置文件
    - index.wxml            —— 首页的 HTML 代码
    - index.wxss            —— 首页的 CSS 代码
- public ————————————————————— 图片文件夹
- utils —————————————————————— 工具文件夹
  - api.js                  —— 控制 API 的文件
  - md5.js                  —— 工具 - MD5 加密文件
  - timestamp.js            —— 工具 - 时间戳文件
- app.json ——————————————————— 设置全局的基础数据等
- app.wxss ——————————————————— 公共样式，可通过 import 导入更多
- project.config.json ———————— 项目配置文件
```

### 微信小程序生命周期

```
onLoad()：页面加载时触发。
onShow()：页面显示/切入前台时触发。
onReady()：页面初次渲染完成时触发。
onHide()：页面隐藏/切入后台时触发。
onUnload()：页面卸载时触发。
```

### 如何封装数据请求

**1，封装接口**

> 项目/utils/api.js

```
// 将请求进行 Promise 封装
const fetch = ({url, data}) => {

  // 打印接口请求的信息
  console.log(`【step 1】API 接口：${url}`);
  console.log("【step 2】data 传参：");
  console.log(data);

  // 返回 Promise
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.api + url,
      data: data,
      success: res => {
        
        // 成功时的处理 
        if (res.data.code == 0) {
          console.log("【step 3】请求成功：");
          console.log(res.data);
          return resolve(res.data);
        } else {
          wx.showModal({
            title: '请求失败',
            content: res.data.message,
            showCancel: false
          });
        }

      },
      fail: err => {
        // 失败时的处理
        console.log(err);
        return reject(err);
      }
    })
  })

}

/**
 * code 换取 openId
 * @data {
 *   jsCode - wx.login() 返回的 code
 * }
 */
export const wxLogin = data => {
  return fetch({
    url: "tbcUser/getWechatOpenId",
    data: data
  })
}
```

**2，调用接口**

> 项目/pages/login/login.js

```
import {
  wxLogin,
} from '../../utils/api.js'
```

**3，使用接口**

> 项目/pages/login/login.js

```
wxLogin({
  jsCode: this.data.code
}).then(
  res => {
    console.log("【step 4】返回成功处理：");
    console.log(res.data);
  },
  err => {
    console.log("【step 4】返回失败处理：");
    console.log(err);
  }
)
```

### 页面数据传递

通过 url 携带参数，在 onLoad() 中通过 options 获取 url 上的参数：

```
<navigator url="../index/index?userId={{userId}}"></navigator>

<!-- 这两段是分别在 HTML 和 JS 中的代码 -->

onLoad: function(options) {
  console.log(options.userId);
}
```

通过 Storage 来传递参数：

```
wx.setStorageSync('userId', 'jsliang');
wx.getStorageSync('userId');
```

WXML传递数据到 JS

> login.wxml

```
<text bindtap="clickText" data-labelId="{{userId}}">点击传递数据到 JS</text>
```

> login.js

```
clickText(e) {
  console.log(e.currentTarget.labelid)
}
```

组件调用传参

> 组件接收数据：component-tag-name

```
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  }
})
```

> 使用组件的页面定义 json

```
{
  "usingComponents": {
    "component-tag-name": "../component/component"
  }
}
```

> 使用组件的页面 HTML 代码

```
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name inner-text="Some text"></component-tag-name>
</view>
```

通过接口调用传递参数

### 加载性能优化方法

1、通过 this.$preload() 预加载用户可能点击的第二个页面

2、组件化页面，出现两次以上的部分都进行封装成组件

3、提取共用的 CSS 样式

4、优化图片：TinyPNG

### 微信小程序与原生APP、Vue、H5差异

**微信小程序优势**

1、无需下载
2、打开速度较快
3、开发成本低于原生APP

**微信小程序劣势**

1、限制多。页面大小不能超过 1M，不能打开超过 5 个层级的页面
2、样式单一。小程序内部组件已经成宿，样式不可以修改
3、推广面窄。跑不出微信，还不能跑入朋友圈

**微信小程序 VS 原生APP**
微信小程序有着低开发成本、低获客成本、无需下载的优势

**微信小程序 VS H5**
1、依赖环境不同。一个能在多种手机浏览器运行。一个只能在微信中的非完整的浏览器
2、开发成本不同。一个可能在各种浏览器出问题。一个只能在微信中运行

**微信小程序 VS Vue**
微信小程序看似就是阉割版的 Vue

### 微信小程序原理

 本质上就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面中进行

架构为数据驱动的模式，UI 和数据分离，所有页面的更新，都需要通过对数据的更改来实现

微信小程序分为两个部分：webview 和 appService。其中 webview 主要用来展示 UI，appServer 用来处理业务逻辑、数据及接口调用。它们在两个进程中进行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理

### wxml与标准的html的异同

wxml基于xml设计，标签只能在微信小程序中使用，不能使用html的标签

## 网络协议

### 网络分层

目前网络分层可分为两种：OSI 模型和 TCP/IP 模型

**OSI模型**

应用层（Application）
表示层（Presentation）
会话层（Session）
传输层（Transport）
网络层（Network）
数据链路层（Data Link）
物理层（Physical）

**TCP/IP模型**

应用层（Application）
传输层（Host-to-Host Transport）
互联网层（Internet）
网络接口层（Network Interface）

### HTTP/HTTPS

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用
2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议
3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443
4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

### HTTP状态码

**区分状态码**
1××开头 - 信息提示
2××开头 - 请求成功
3××开头 - 请求被重定向
4××开头 - 请求错误
5××开头 - 服务器错误

**常见状态码**
200 - 请求成功，Ajax 接受到信息了
400 - 服务器不理解请求
403 - 服务器拒绝请求
404 - 请求页面错误
500 - 服务器内部错误，无法完成请求

## 性能优化

### HTML优化

```
1、避免 HTML 中书写 CSS 代码，因为这样难以维护。
2、使用 Viewport 加速页面的渲染。
3、使用语义化标签，减少 CSS 代码，增加可读性和 SEO。
4、减少标签的使用，DOM 解析是一个大量遍历的过程，减少不必要的标签，能降低遍历的次数。
5、避免 src、href 等的值为空，因为即时它们为空，浏览器也会发起 HTTP 请求。
6、减少 DNS 查询的次数
```

### CSS优化

```
1、优化选择器路径：使用 .c {} 而不是 .a .b .c {}。
2、选择器合并：共同的属性内容提起出来，压缩空间和资源开销。
3、精准样式：使用 padding-left: 10px 而不是 padding: 0 0 0 10px。
4、雪碧图：将小的图标合并到一张图中，这样所有的图片只需要请求一次。
5、避免通配符：.a .b * {} 这样的选择器，根据从右到左的解析顺序在解析过程中遇到通配符 * {} 6、会遍历整个 DOM，性能大大损耗。
7、少用 float：float 在渲染时计算量比较大，可以使用 flex 布局。
8、为 0 值去单位：增加兼容性。
9、压缩文件大小，减少资源下载负担。
```

### JavaScript优化

```
1、尽可能把 <script> 标签放在 body 之后，避免 JS 的执行卡住 DOM 的渲染，最大程度保证页面尽快地展示出来
2、尽可能合并 JS 代码：提取公共方法，进行面向对象设计等……
3、CSS 能做的事情，尽量不用 JS 来做，毕竟 JS 的解析执行比较粗暴，而 CSS 效率更高。
4、尽可能逐条操作 DOM，并预定好 CSs 样式，从而减少 reflow 或者 repaint 的次数。
5、尽可能少地创建 DOM，而是在 HTML 和 CSS 中使用 display: none 来隐藏，按需显示。
6、压缩文件大小，减少资源下载负担。
```

## 面试常见的其他问题

### 常问

1、自我介绍
2、你的项目中技术难点是什么？遇到了什么问题？你是怎么解决的？
3、你认为哪个项目做得最好？
4、平时是如何学习前端开发的？
5、你最有成就感的一件事
6、你是怎么学习前端的

### 人事面

1、面试完你还有什么问题要问的吗
2、你有什么爱好?
3、你最大的优点和缺点是什么?
4、你为什么会选择这个行业，职位?
5、你觉得你适合从事这个岗位吗?
6、你有什么职业规划?
7、你对工资有什么要求?
8、如何看待前端开发？
9、未来三到五年的规划是怎样的？

### 其他

**谈谈你对重构的理解？**

网络重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变UI的情况下，对网站进行优化， 在扩展的同时保持一致的UI

对于传统的网站来说重构通常是：

- 表格(table)布局改为DIV+CSS
- 使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)
- 对于移动平台的优化
- 针对于SEO进行优化

**什么样的前端代码是好的？**

高复用低耦合，这样文件小，好维护，而且好扩展

**对前端工程师这个职位是怎么样理解的？它的前景会怎么样？**

前端是最贴近用户的程序员，比后端、数据库、产品经理、运营、安全都近

- 实现界面交互
- 提升用户体验
- 有了Node.js，前端可以实现服务端的一些事情

前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好，

与团队成员，UI设计，产品经理的沟通；

做好的页面结构，页面重构和用户体验；

**你觉得前端工程的价值体现在哪？**

1、为简化用户使用提供技术支持（交互部分）
2、为多个浏览器兼容性提供支持
3、为提高用户浏览速度（浏览器性能）提供支持
4、为跨平台或者其他基于webkit或其他渲染引擎的应用提供支持
5、为展示数据提供支持（数据接口）

**平时如何管理你的项目？**

- 先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等；
- 编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；
- 标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；
- 页面进行标注（例如 页面 模块 开始和结束）；
- CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）；
- JS 分文件夹存放 命名以该JS功能为准的英文翻译。
- 图片采用整合的 images.png png8 格式文件使用 - 尽量整合在一起使用方便将来的管理

**移动端（Android IOS）怎么做好用户体验?**

清晰的视觉纵线、
信息的分组、极致的减法、
利用选择代替输入、
标签及文字的排布方式、
依靠明文确认密码、
合理的键盘利用