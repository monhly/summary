## Rem适配

**Bootstrap框架**

1. 全局样式

   - 在框架中通过类名的方式给标签设置样式
   - .h1 -  .h6  
   - .small
   - .text-left   |  .text-center   | .text-right
   - .text-lowercase (小写字母)  |  .text-uppercase (转大写字母)  |   .text-capitalize
   - 去掉列表默认的样式的时候  .list-unstyled
   - 实现li一行显示可以给父元素设置 . list-inline
   - 给表格设置基本的样式   .table
   - 设置带边框的表格  .table-bordered
   - 实现鼠标悬停时候的样式  .table-hover

2. 栅格系统

   ```css
   作用： 用来实现响应式布局，通过将设备（视口）分为 12列实现的
   ```

3. 如何使用栅格系统

   - 必须引用 bootstrap.css文件
   - 必须给父容器设置类名 container 【有固定宽度且居中显示】或者  container-fluid【网页是满屏显示】
     - 只要给盒子设置了  container   或者  container-fluid 类名后就会将当前盒子分为12列
   - 通过**栅格参数**实现响应式布局
     - col-md     ---> (适配电脑屏幕)
     - col-sm     ---->(适配平板设备)
     - col-xs       ----->(适配手机设备)
     - col-lg       -----> （适配大屏幕设备的）

1. 回顾移动端布局方式

   1. 流式布局（百分比布局）
   2. 伸缩布局（弹性盒子）
   3. 响应式布局（媒体查询）
   4. **rem适配： 让元素（内容）随着设备的宽度改变，自己发生大小的改变**

2. 演示苏宁易购https://m.suning.com/>

3. 知识点-介绍rem单位
   - **介绍-em单位： 相对单位，em是相对当前标签中文字大小**
   - **介绍-rem单位**：**相对单位，r【root】，rem单位是相对html根标签中的文字大小**
   - **补充：为什么页面适配要使用rem而不使用em？**
     - rem在适配的时候是相对html中的文字大小
     - html中的文字大小不会影响某个具体标签中的文字大小（继承的权重为0）
     - **rem适配最重要的一步就是要保证html中设置文字大小**

4. **rem适配两个公式**

   - **计算移动设备中根标签文字大小 = 当前设备宽度 / 缩放的倍数（20）**
   - **计算UI图片中测量元素的rem值 =  测量大小 / （UI图大小/缩放倍数 20）**
   - **动态的通过媒体查询的方式给每台设备中设置根标签文字大小**

5. 知识点-rem单位适配原理分析

   1. 在实际开发过程中，UI图都会比我们的移动设备要大
      1. 常见的UI大小有  640px
      2. 常见的UI大小有 750px
      3. 常见的UI大小有 1024px

   - 先将UI稿件分为若干份，以20份为例
   - 计算UI稿件中每一个具体元素的大小（注：以rem为单位）
   - 将移动设备按照UI稿件分为若干份（注：每一份大小作为 html根标签文字大小）

6. 知识点-rem适配公式总结
   1.  设备中根标签文字大小  = 设备宽度 / 份数
   2.  元素最后在页面中的比例大小(rem) = 当前元素实际测量大小rem / （UI图宽度/份数）;

7. 优惠券案例-rem适配
   1. 优惠券案例-样式初始化
   2. 优惠券案例-计算根标签文字大小
   3. 优惠券案例-实现完成

    

    
