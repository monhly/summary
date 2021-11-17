# 移动web伸缩布局

## ☞伸缩布局

### ☞ 什么是布局？

> 在网页中摆放盒子的位置
>
> 1. 通过浮动
> 2. 通过定位的方式
> 3. 通过margin + padding

### 1.演示伸缩布局与普通布局差异效果

### ☞ 什么时候使用伸缩布局

> 1. 如果在网页中希望让**元素一行显示**，并且元素随着父元素的宽度改变**布局方式不会受影响**
> 2. 使用了伸缩布局以后，还可以使用浮动，定位，margin，padding
> 3. 伸缩布局只是一个新的布局方式，不要把伸缩布局看的太重或太难

### ☞伸缩布局学习的两个步骤

- 给父元素设置的属性
  - display: flex   ----> 设置为伸缩盒子（弹性盒子）
  - flex-direction  ---> 设置主轴方向（默认值： row）
  - justify-content   ---> 设置元素在主轴方向的对齐方式
  - align-items  --->     设置元素在侧轴方向的对齐方式
  - flex-wrap  --->        设置子元素是否换行
  - align-content  ---> 元素换行后的对齐方式【了解】
- 给子元素设置的属性
  - flex: 子元素占父元素剩余宽度的比例
  - order:  设置元素排序【值越小越靠前】

### 2.知识点-伸缩布局

1. 知识点-父元素设置伸缩盒子-定义

   ```css
   display: flex;
   ```

2. 知识点-伸缩盒子-特点总结

   ```css
   1. 伸缩盒子中的所有子元素都是一行显示的
   2. 解释为甚么伸缩盒子中的元素默认会一行显示
   	☞ 在伸缩盒子中有一条主轴，主轴的默认水平显示
   	☞ 在伸缩盒子中元素都是按照主轴显示的
   
   3. 在伸缩盒子中还有一条轴，叫侧轴。（侧轴始终要垂直于主轴，侧轴的方向是随着主轴的方向发生改变的）
   
   4. 在伸缩盒子中，如果子元素的宽度超出父元素的宽度，那么元素也不会换行
   注意：
      在伸缩盒子中元素一行显示，与脱标没有任何关系
   ```

3. 知识点-伸缩盒子-flex-direction介绍

   ```css
   flex-direction： 设置主轴方向的
   
   flex-direction: row(默认值，水平显示)  | column（竖显示） |  row-reverse （了解） | column-reverse（了解）
   ```

4. 知识点-伸缩盒子-justify-content介绍

   ```css
   justify-content: 设置伸缩盒子中子元素在主轴方向的对齐方式
   ☞
   justify-content: flex-start; 
   justify-content: flex-end;
   justify-content: center; 
   justify-content: space-between; 
   justify-content: space-around;
   ```

5. 知识点-伸缩盒子-align-items介绍

   ```css
   align-items: 设置元素相对侧轴对齐方式
   
   stretch（默认值，拉伸效果） | flex-start | flex-end | center
   ```

6. 知识点-伸缩盒子-flex-wrap介绍

   ```css
   flex-wrap： 设置伸缩盒子中元素是否换行显示
   
   nowrap默认不换行 |  wrap （换行）
   ```

7. 知识点-伸缩盒子-align-content介绍

   ```css
   align-content: 当元素换行后的一种对齐方式
   
   stretch（默认值） | flex-start | flex-end | center | space-between | space-around
   注意：
   	如果要设置align-content必须要保证元素是换行的
   ```

8. 知识点-伸缩盒子-flex介绍

   ```css
   flex: 设置子元素占父元素剩余宽度的一个比例
   
   注意：
    1. flex 属性是给子元素设置的
    2. 剩余宽度：如果父元素中有固定宽度的盒子，那么flex所占的比例是父元素整个的宽度-固定宽度后的比例
   ```

9. 知识点-伸缩盒子中-子元素排序

   ```css
   order: 值;
   特点：
   	1. 值越大元素越靠后显示
   	2. 在排序的时候，完全不用修改html结构
   ```

10. 补充：flex-flow 属性是 flex-direction 和 flex-wrap 属性的复合属性。

   ```css
   flex-flow:row-reverse  wrap;
   ```


### 3.携程案例-伸缩布局

1. 携程案例-分析结构
2. 携程案例-顶部图片-伸缩适配+百分比适配
3. 携程案例-主体区域-伸缩适配
4. 携程案例-底部区域-伸缩适配

## ☞Less

### 1. 知识点-Less介绍

- less的作用是什么？

  ```css
  我们可以使用less  去写 CSS代码
  
  使用less去写CSS代码的优势
  	1.less中可以进行数学运算 （+ - 乘 除）
  	2.less中可以支持选择器中嵌套选择器
  ```

- 知识点-less-的概念

  ```css
  Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
  ```

  - less是用来处理css的一个工具
  - less又扩展了css(less支持css不支持的写法)
  - less中增加了（变量，数学计算，函数等写法）

- 安装less插件（easyLess）

  ```css
  将当前的less文件编译成css文件
  
  目的： 为了将less中的代码编译成css代码
  
  安装完成后，建议将vscode重新
  ```

### 2.知识点-Less使用步骤

1. 知识点-新建less文件

   - 文件名以 .less结尾

2. 知识点-Less按照CSS语法编写

   1. less文件中完全可以使用css原生的语法去写

3. Less-语法

   1. 知识点-less-嵌套语法【掌握】

      ```css
      .nav {
           li {
               
           }
      }
      ```

   2. 知识点-less-变量使用【掌握】

      1. 定义变量 

         > @ 自定义变量名

      2. 给变量赋值

         > @自定义变量名: 值

         ```css
         @divwidth: 200px;
         div {
             width: @divwidth;
         }
         ```

   3. 知识点-less-混合写法【了解】

      ```css
      //less中的函数 【类似于css中的公共样式】
      #abc() {
          color: red;
          font-size: 20px;
      }
      
      
      例如：
      .public() {
          width: 300px;
          height: 300px;
          background-color: green;
      }
      
      .one {
          color: red;
          .public();
      }
      
      .two {
          color: pink;
          .public();
      }
      ```

   4. 知识点-less-数学运算【掌握】

      ```css
      例如：
      div {
          width: @divwidth - 200px;
      }
      ```

   5. 如果希望在网页中使用less文件中的代码

      1. 可以直接在网页引用通过less编译后的css文件

   6. 知识点-在网页中可以直接引用less文件

      - <link rel="stylesheet/less" type="text/css" href="less文件.less">

      - <script type="text/javascript" src="less.js"></script>

      - 放到服务器环境下

## ☞Less完成携程案例

1. less携程案例-顶部图片区域
2. less携程案例-主体区域
3. less携程案例-底部区域