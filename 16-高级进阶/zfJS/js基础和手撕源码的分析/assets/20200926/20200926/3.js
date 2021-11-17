/*
 * JS高阶编程技巧「本质：基于“闭包”的机制完成的」 
 *   闭包的特点：
 *     + 保护
 *     + 保存
 *     + 弊端:占用内存，消耗浏览器的性能（闭包可以用，但是不能滥用）
 * 
 * 应用3：惰性函数(思想)
 *   + 懒：能够干一次的绝对不会干第二次
 */

// 获取元素的样式
//   + window.getComputedStyle([元素对象]) 不兼容IE6~8
//   + [元素对象].currentStyle
// 属性名 in 对象：检测当前这个属性是否属于这个对象

/*
 * 性能上的问题：
 *   在某个浏览器中渲染页面(渲染代码)
 *     + 第一次执行 get_css 需要验证浏览器的兼容性
 *     + 后期每一次执行 get_css ，浏览器的兼容性检测都会执行一遍 “这个操作是没有必要的”
 */
/* function get_css(element, attr) {
    if ('getComputedStyle' in window) {
        return window.getComputedStyle(element)[attr];
    }
    return element.currentStyle[attr];
} */

// 基于“惰性函数”提高上述的性能
function get_css(element, attr) {
    // 第一次执行get_css，根据浏览器的兼容情况，对外部的get_css函数进行重构
    if ('getComputedStyle' in window) {
        get_css = function (element, attr) {
            return window.getComputedStyle(element)[attr];
        };
    } else {
        get_css = function (element, attr) {
            return element.currentStyle[attr];
        };
    }
    // 第一次执行也是需要获取到结果的，所以我们把重构的函数执行一次
    return get_css(element, attr);
}

var w = get_css(document.body, 'width');
console.log(w);

// 后续再次执行get_css，执行是的是第一次重构后的小方法，无需再次校验兼容性
var h = get_css(document.body, 'height');
console.log(h);

// ...