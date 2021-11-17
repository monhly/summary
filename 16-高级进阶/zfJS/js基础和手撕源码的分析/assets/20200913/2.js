/* 
 * 客户端从服务器获取到需要渲染页面的源代码后
 *  「开辟一个“GUI渲染线程”，自上而下解析代码，最后绘制出对应的页面」
 * 
 * 自上而下渲染解析代码的过程是“同步”的，但是有些操作也是异步的
 * 
 * 1.关于CSS资源的加载
 *   + 遇到的是<style> “内嵌样式”
 *     =>“同步” 交给GUI渲染线程解析
 * 
 *   + 遇到的是<link> “外链样式”
 *     =>“异步” 开辟一个新的“HTTP网络请求线程”　
 *        注意：同一个源下，根据不同的浏览器，最多只允许同时开辟4～7个HTTP线程 “HTTP的并发数”
 *     =>不等待资源信息请求回来，GUI渲染线程继续向下渲染
 *     =>GUI渲染线程同步操作都处理完成后，再把基于HTTP图片络线程请求回来的资源文件进行解析渲染
 * 
 *   + 遇到@import “导入式样式”
 *     =>“同步” 开辟一个新的“HTTP网络请求线程”去请求资源文件
 *     =>但是在资源文件没有请求回来之前，GUI渲染线程会被“阻塞”，不允许其继续向下渲染
 *   
 * 2.遇到<script>资源的请求
 *   + 默认都是“同步”的：必须基于HTTP网络线程，把资源请求回来之后，并且交给“JS渲染线程”渲染解析完成后，GUI渲染线程才能继续向下渲染，所以<script>默认也是“阻碍GUI渲染”的
 * 
 *   + async属性：遇到<script async>首先也是开辟一个HTTP网络线程去请求加载资源文件，与此同时GUI渲染线程继续向下渲染「把默认的同步改为“异步”」，但是一旦当资源请求回来后，会中断GUI的渲染，先把请求回来的JS进行渲染解析
 * 
 *   + defer属性：遇到<script defer> 和async类似，都是新开辟HTTP网络线程去请求加载资源文件，与此同时GUI还会继续渲染「“异步”」，但是不一样的地方是，defer和link类似，是在GUI同步的代码渲染完成后，才会渲染解析请求回来的JS代码
 *     
 * 3.遇到<img>或者音视频资源
 *   + 遇到这些资源，也会发送新的HTTP网络线程，请求加载对应的资源文件，不会阻碍GUI的渲染「“异步”」；当GUI渲染完成后，才会把请求回来资源信息进行渲染解析；
 *   
 * Webkit浏览器预测解析：chrome的预加载扫描器html-preload-scanner通过扫描节点中的 “src” , “link”等属性，找到外部连接资源后进行预加载，避免了资源加载的等待时间，同样实现了提前加载以及加载和执行分离
 * 
 * 
 * 页面渲染的步骤：
 *    + DOM TREE（DOM树）：自上而下渲染完页面，整理好整个页面的DOM结构关系
 *    + CSSOM TREE（样式树）：当把所有的样式资源请求加载回来后，按照引入CSS的顺序，依次渲染样式代码，生成样式树
 *    + RENDER TREE（渲染树）：把生成的DOM树和CSSOM树合并在一起，生成渲染树（设置display:none的元素不进行处理）
 *    + Layout 布局/回流/重排： 根据生成的渲染树，计算它们在设备视口(viewport)内的确切位置和大小
 *    + 分层处理：按照层级定位分层处理，每一个层级都有会详细规划出具体的绘制步骤,MoreTools中使用layers
 *    + Painting：按照每一个层级计算处理的绘制步骤，开始绘制页面
 * 
 * 前端性能优化 「CRP：关键渲染路径」
 *    + 生成DOM TREE
 *      + 减少DOM的层级嵌套
 *      + 不要使用“非标准”的标签
 *      + ...
 *    + 生成CSSOM
 *      + 尽可能不要使用@import（阻塞GUI渲染）
 *      + 如果CSS代码比较少，尽可能使用“style内嵌样式”（尤其是移动端开发）
 *      + 如果使用link，尽可能把所有的样式资源合并为一个，且压缩（减少HTTP请求数量，因为HTTP的并发性也是有限制的，以及渲染CSS的时候，也不需要再计算依赖关系...）
 *      + CSS选择器链短一些（因为CSS选择器渲染是从右到左的）
 *      + 把link等导入CSS的操作放在HEAD中（目的是：一加载页面就开始请求资源，同时GUI去生成DOM树 “CSS等资源预先加载”）
 *      + ...
 *    + 对于其他资源的优化
 *      + 对于<script>，尽可能放置在页面的底部（防止其阻塞GUI的渲染）；对于部分<script>需要使用async或者defer；
 *        + async是不管JS的依赖关系的，哪一个资源先获取到，就先把这个资源代码渲染执行
 *        + defer不会这样的，和link一样，是等待所有<script defer>都请求回来后，按照导入顺序/依赖关系依次渲染执行的 
 *      + 对于<img>
 *        + 懒加载：第一次加载页面的时候不要加载请求图片，哪怕它是异步的，但是也占据了HTTP并发的数量，导致其他资源延后加载
 *        + 图片的BASE64：不用去请求加载图片，BASE64码基本上代表的就是图片，而且页面渲染图片的时候速度也会很快（慎用，但是在webpack工程化中可以使用，因为它基于file-loader可以自动base64）
 *      + ...
 *    + Layout/Painting：重要的优化手段（减少DOM的“回流/重排”和重绘）
 *      + 第一次加载页面必然会有一次回流和重绘
 *      + 触发回流操作后，也必然绘触发重绘；如果只是单纯的重绘，则不会引发回流；性能优化点，重点都在回流上；
 */
// 操作DOM消耗性能？ =>DOM的回流
//  + 元素在视口中的大小或者位置发生变化
//  + 元素的删除或者新增（以及基于display控制显示隐藏）
//  + 浏览器视口大小发生改变
//  + ...
// 这些操作都需要浏览器重新计算每一个元素在视口中的位置和大小（也就是重新Layout/Reflow）

// 当代浏览的渲染队列机制：在当前上下文操作中，遇到一行修改样式的代码，并没有立即通知浏览器渲染，而是把其放置在渲染队列中，接下来看是否还有修改样式的代码，如果有继续放置在渲染队列中...一直到再也没有修改样式的代码或者“遇到一行获取样式的操作”，这样都会刷新浏览器的渲染队列机制（也就是把现在队列中修改样式的操作，统一告诉浏览器渲染，这样只会引发一次回流）
/* box.style.width = "100px";
box.style.height = "200px";
box.offsetHeight; //box.style.xxx 或者 window.getComputedStyle(box).xxx 再或者 box.clientWidth|Height|Top|Left 以及 box.offsetWidth|Height|Top|Left 或者 box.scrollWidth|Height|Top|Left ...这些获取样式的操作都会刷新渲染队列
box.style.position = "absolute";
box.style.top = "100px"; */

// 总方式：不要自己直接去操作DOM，例如vue/react
// 1.样式的“分离读写”：把修改样式和获取样式代码分离开
/* box.style.width = "100px";
box.style.height = "200px";
box.style.position = "absolute";
box.style.top = "100px";
box.offsetHeight; */

/* box.style.cssText = "width:100px;height:200px;...";
box.className = ".boxActive"; */

/* box.style.width = box.offsetWidth + 10 + 'px';
box.style.height = box.offsetHeight + 10 + 'px';

let w = box.offsetWidth,
    h = box.offsetHeight;
box.style.width = w + 10 + 'px';
box.style.height = h + 'px'; */

// 2.新增元素
// let arr = ["张三", "李四", "王五"];
// 循环几次引发几次回流
/* arr.forEach(item => {
    let span = document.createElement('span');
    span.innerText = item;
    document.body.appendChild(span);
}); */

/* // 模板字符串：可能因为把原始容器的内容变为字符串和新的字符串拼接，最后再整体渲染回去，导致原始容器中的元素绑定的一些事件失效...
let str = ``;
arr.forEach(item => {
    str += `<span>
        ${item}
    </span>`;
});
document.body.innerHTML += str; */

/* // 文档碎片：临时存放元素对象的容器
let frag = document.createDocumentFragment();
arr.forEach(item => {
    let span = document.createElement('span');
    span.innerText = item;
    frag.appendChild(span);
});
document.body.appendChild(frag);
frag = null; */

// 3.把动画等频发样式改变的操纵，运用到position:fixed/absolute...上 「脱离文档流：单独一层」
//  + 利用分层机制，如果只改变一个层面上的位置大小等信息，浏览器回流和重绘的速度会加快很多

// 4.修改元素的 transform / opacity（filters）... 的这些样式，不会引发DOM的回流 「浏览器的硬件加速，弊端就是消耗浏览器的内存」

setTimeout(() => {
    // 立即回到left:0的位置
    box.style.transitionDuration = '0s';
    box.style.left = 0;

    // 刷新渲染队列（会增加一次回流）
    box.offsetLeft;
    
    // 回到开始位置后，再次运动到left:200位置(有动画)
    box.style.transitionDuration = '0.5s';
    box.style.left = '200px';
}, 1000);